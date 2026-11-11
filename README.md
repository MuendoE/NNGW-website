# NN Glass website

Single-page website for NN Glass (Pty) Ltd, Midrand. Plain HTML, CSS and JavaScript with one small PHP file for the enquiry form. No build step and no database: upload the files to any cPanel host and it runs.

## Status

Built from the written brief (black, white and electric blue; single page; working enquiry form). The original prototype source files and the client's logo have **not** been merged yet — see "Outstanding before launch".

## Updating the site

Almost everything you will change day to day is in **`js/config.js`**:

- **Phone / WhatsApp number, email, social links** — change the text between the quotes. Leaving a social link empty hides its icon (YouTube is hidden until a link is supplied).
- **Gallery** — upload a photo to `images/gallery/`, then add one line to the `gallery` list. Instructions and an example are in the file. Filter buttons appear automatically once photos from more than one category are listed.

Photo guidelines: JPG or WebP, about 1600px on the long side, under 300 KB each. Genuine NN Glass projects only.

The address that receives enquiries is set separately in **`api/config.php`**.

Page wording is in `index.html`; colours and fonts are at the top of `css/styles.css`.

## Enquiry form

`api/enquiry.php` validates the submission, emails it to the address in `api/config.php`, and keeps a copy in `storage/enquiries.log` (blocked from the web) so a lead is not lost if email delivery fails. It includes a honeypot, a minimum-time check and a per-visitor rate limit, so no CAPTCHA is needed.

The `from` address in `api/config.php` must be a real mailbox on the site's own domain, and the domain needs SPF and DKIM records (cPanel > Email Deliverability), otherwise enquiries will land in spam.

## Running locally

```
php -S 127.0.0.1:8000
```

Then open http://127.0.0.1:8000. Email will not send locally, but enquiries are written to `storage/enquiries.log`.

## Deploying (cPanel)

1. Upload everything except `.git` and `README.md` to `public_html`.
2. Make sure hidden files are included: `.htaccess` and `storage/.htaccess`.
3. Issue the free SSL certificate (AutoSSL / Let's Encrypt). `.htaccess` then forces HTTPS.
4. Create the mailboxes and set them in `api/config.php`.
5. Send a test enquiry and check it arrives in the inbox, not spam.

## Outstanding before launch

- [ ] Merge the prototype design and client logo (handover zip not yet in this repo; the header currently uses a text wordmark)
- [ ] Genuine project photographs for the gallery
- [ ] Confirm the contact number (078 486 5809)
- [ ] Confirm domain and email address; update `js/config.js`, `api/config.php`, `robots.txt`, `sitemap.xml`, and the canonical / Open Graph / JSON-LD entries in the `<head>` of `index.html`
- [ ] Verify the Instagram and TikTok links; add the YouTube link
- [ ] Confirm whether the client still owns nnglassrepairs.co.za and has email data there
- [ ] Review page wording with the client
- [ ] Submit the sitemap in Google Search Console and create/claim the Google Business Profile
