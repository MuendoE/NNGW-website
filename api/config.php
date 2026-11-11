<?php
// Enquiry form settings. Edit the values, keep the quotes.
return [
    // Where enquiries are delivered. TODO: confirm final address with client.
    'to' => 'info@nnglassbalustrade.co.za',

    // Must be a mailbox on the website's own domain, or the message will fail
    // SPF/DKIM checks and land in spam.
    'from' => 'website@nnglassbalustrade.co.za',
    'from_name' => 'NN Glass Website',

    'subject_prefix' => 'Website enquiry',

    // Keep a copy of every enquiry in storage/enquiries.log so a lead is never
    // lost if email delivery fails. The storage folder is blocked from the web.
    'keep_log' => true,

    // Maximum enquiries accepted from one visitor per hour.
    'rate_limit' => 5,
];
