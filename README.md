# NN Glass website

Single-page website for NN Glass (Pty) Ltd, Midrand. Plain HTML, CSS and JavaScript with one small PHP file for the enquiry form. No build step, framework or database: upload the files to any cPanel host and it runs.

The design is the approved one-page concept (black/charcoal, white and electric cyan, serif headings), ported from the prototype in the developer handover package. The package itself is not kept in this repository; the original is the attachment on the project email.

## Current state: concept preview

The site is in **preview mode**. It shows the "private design concept" strip, labels the stock photographs as stock, and tells search engines not to list it. See "Going live" for the switch.

## What changed from the concept

Kept: layout, colours, typography, section order, logo and wording.

Changed:

- **Enquiry form now sends.** It emails the enquiry through `api/enquiry.php`, and a second button hands the same details to WhatsApp. A phone field was added, because the concept form collected no way to reply.
- **Styles and script moved out of the page** into `css/styles.css` and `js/main.js`, so the server can enforce a strict content security policy.
- **Contact details, social links and the gallery are settings**, in `js/config.js`.
- **Gallery** takes any number of photos and the lightbox has previous/next.
- **Images** are resized WebP files (hero 433 KB to 219 KB, with a 76 KB version for phones). The logo is the client's original, trimmed of empty margin and resized, otherwise untouched.
- **Legibility**: the smallest text was raised by 1–2px and the cyan used for small text on light backgrounds was darkened (`#0f779b`) to meet WCAG AA contrast. The brand cyan `#65c9e8` is unchanged everywhere else.
- **Wording**: one sentence in "The NN Glass approach" that described the website itself was replaced with customer-facing copy; the gallery intro and form text no longer mention the prototype.
- **Additions**: sticky header, skip link, real social icons, favicon, share image, a WhatsApp button on phones, search-engine tags and structured data.

## Updating the site

Almost everything you will change day to day is in **`js/config.js`**:

- **Phone / WhatsApp number, email, social links** — change the text between the quotes. An empty value hides that item.
- **Gallery** — upload a photo to `images/gallery/`, then add one entry to the `gallery` list. Instructions and an example are in the file.

Photo guidelines: JPG or WebP, about 1600px on the long side, under 300 KB each (squoosh.app does this in the browser). Genuine NN Glass projects only.

The hero photo and the "approach" photo are set in `index.html`; search for `LAUNCH:` to find them.

The address that receives enquiries is set separately in **`api/config.php`**.

## Enquiry form

`api/enquiry.php` validates the submission, emails it to the address in `api/config.php`, and keeps a copy in `storage/enquiries.log` (blocked from the web) so a lead is not lost if email delivery fails. It includes a honeypot, a minimum-time check and a per-visitor rate limit, so no CAPTCHA is needed.

The `from` address in `api/config.php` must be a real mailbox on the site's own domain, and the domain needs SPF, DKIM and DMARC records (cPanel > Email Deliverability), otherwise enquiries will land in spam.

## Running locally

```
php -S 127.0.0.1:8000
```

Then open http://127.0.0.1:8000. Email will not send locally, but enquiries are written to `storage/enquiries.log`.

## Deploying (cPanel)

1. Upload everything to `public_html` **except** `.git` and `README.md`.
2. Make sure hidden files are included: `.htaccess` and `storage/.htaccess`.
3. Issue the free SSL certificate (AutoSSL / Let's Encrypt). `.htaccess` then forces HTTPS.
4. Create the mailboxes and set them in `api/config.php`.
5. Send a test enquiry and check it arrives in the inbox, not spam.

Backups: the Git repository is the backup of the site itself. `storage/enquiries.log` lives only on the server, so include it in the host's backup.

## Going live

Do not do these until the client has confirmed and genuine photographs are in.

- [ ] Replace the hero photo, the "approach" photo and the three gallery samples with genuine NN Glass project photographs
- [ ] Set `previewMode: false` in `js/config.js`
- [ ] Delete the `noindex` line in the `<head>` of `index.html`
- [ ] Confirm the contact number (+27 78 486 5809, taken from the public Facebook page)
- [ ] Confirm the domain; update `robots.txt`, `sitemap.xml`, and the canonical / Open Graph / JSON-LD entries in `index.html`
- [ ] Confirm the email address; set it in `js/config.js` and `api/config.php`
- [ ] Verify the Instagram and TikTok links; add the YouTube link
- [ ] Confirm the full service list (the Facebook page also mentions cottage panels), working hours and areas served
- [ ] Establish whether the client still owns nnglassrepairs.co.za and any mailbox on it
- [ ] Have the client approve the wording
- [ ] Submit the sitemap in Google Search Console and claim the Google Business Profile

## Stock photographs

The four photographs under `images/sample/` are third-party stock from the concept. Their licence terms were not supplied. Embedded metadata credits `modern-home` to Max Vakhtbovych (2Eyes prod.) and `glass-wall` to Matheus Ferreira; the other two carry no credit. They must not appear on the live site.
