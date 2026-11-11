<?php
/**
 * NN Glass enquiry form handler.
 * Accepts a POST from the contact form, validates it, emails it to the
 * business and (optionally) keeps a copy in storage/enquiries.log.
 * Replies with JSON for the page's script, or redirects when JS is off.
 */
declare(strict_types=1);

$config = require __DIR__ . '/config.php';
$storage = dirname(__DIR__) . '/storage';

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

function respond(bool $ok, string $message, int $status, bool $wantsJson): void
{
    if ($wantsJson) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        echo json_encode(['ok' => $ok, 'message' => $message]);
    } else {
        header('Location: ../?enquiry=' . ($ok ? 'sent' : 'error') . '#contact', true, 303);
    }
    exit;
}

function field(string $name, int $max): string
{
    $value = $_POST[$name] ?? '';
    if (!is_string($value)) {
        return '';
    }
    $value = trim(str_replace("\0", '', $value));
    return mb_substr($value, 0, $max);
}

/** Strip anything that could inject extra mail headers. */
function oneLine(string $value): string
{
    return trim(preg_replace('/[\r\n\t]+/', ' ', $value));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 'Method not allowed.', 405, $wantsJson);
}

// Only accept submissions that come from this site.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== explode(':', $_SERVER['HTTP_HOST'] ?? '')[0]) {
    respond(false, 'Request not allowed.', 403, $wantsJson);
}

// Spam traps: a hidden field real visitors never fill in, and a minimum
// time between the form loading and being sent. Pretend success to bots.
$elapsed = time() - (int) ($_POST['started'] ?? 0);
if (field('company_website', 200) !== '' || $elapsed < 3) {
    respond(true, 'Thank you — your enquiry has been sent.', 200, $wantsJson);
}

$name    = oneLine(field('name', 100));
$phone   = oneLine(field('phone', 30));
$email   = oneLine(field('email', 150));
$service = oneLine(field('service', 80));
$message = field('message', 3000);

$errors = [];
if (mb_strlen($name) < 2) {
    $errors[] = 'Please enter your name.';
}
if (!preg_match('/^[0-9+()\s-]{7,30}$/', $phone)) {
    $errors[] = 'Please enter a valid phone number.';
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please check your email address.';
}
if (mb_strlen($message) < 5) {
    $errors[] = 'Please tell us a little about what you need.';
}
if ($errors) {
    respond(false, implode(' ', $errors), 422, $wantsJson);
}

// Rate limit per visitor (hashed IP, so no raw addresses are stored).
$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . __DIR__);
if (is_dir($storage) || @mkdir($storage, 0750, true)) {
    $rateFile = $storage . '/rate-' . substr($ipHash, 0, 32) . '.json';
    $hits = is_file($rateFile) ? (json_decode((string) file_get_contents($rateFile), true) ?: []) : [];
    $hits = array_values(array_filter($hits, fn ($t) => $t > time() - 3600));
    if (count($hits) >= (int) $config['rate_limit']) {
        respond(false, 'Too many enquiries from this device. Please call or WhatsApp us instead.', 429, $wantsJson);
    }
    $hits[] = time();
    @file_put_contents($rateFile, json_encode($hits), LOCK_EX);
}

$body = "New enquiry from the NN Glass website\n"
    . "--------------------------------------\n"
    . "Name:    $name\n"
    . "Phone:   $phone\n"
    . 'Email:   ' . ($email !== '' ? $email : '(not given)') . "\n"
    . 'Service: ' . ($service !== '' ? $service : '(not specified)') . "\n\n"
    . "Message:\n$message\n\n"
    . '--' . "\nSent " . date('Y-m-d H:i') . " from the website enquiry form.\n";

$logged = false;
if (!empty($config['keep_log']) && is_dir($storage)) {
    $entry = '[' . date('c') . "]\n" . $body . "\n==========\n\n";
    $logged = @file_put_contents($storage . '/enquiries.log', $entry, FILE_APPEND | LOCK_EX) !== false;
}

$subject = $config['subject_prefix'] . ': ' . ($service !== '' ? $service . ' — ' : '') . $name;
$headers = [
    'From: ' . mb_encode_mimeheader($config['from_name']) . ' <' . $config['from'] . '>',
    'Reply-To: ' . ($email !== '' ? $email : $config['from']),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];
$sent = @mail(
    $config['to'],
    mb_encode_mimeheader($subject),
    $body,
    implode("\r\n", $headers),
    '-f' . $config['from']
);

if (!$sent && !$logged) {
    respond(false, 'Sorry, we could not send your enquiry. Please call or WhatsApp us instead.', 500, $wantsJson);
}

respond(true, 'Thank you — your enquiry has been sent. We will be in touch shortly.', 200, $wantsJson);
