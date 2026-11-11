# NN Glass (Pty) Ltd — Website Developer Handover

Prepared 11 November 2026. **Private one-page prototype; not a live customer website.**

## 1. What is supplied

- `website/index.html` — portable static HTML, CSS and JavaScript. No build tool, framework, database, API or third-party JavaScript dependency is required.
- `website/assets/nn-glass-logo.jpg` — actual logo supplied by the client. Retain the original logo and its appearance.
- Four photographic assets in `website/assets/` — **temporary third-party stock photographs**, not NN Glass's completed projects. Replace before public launch.
- Private concept preview: `https://nn-glass-concept-2026.linedcider16.chatgpt.site` (ChatGPT owner sign-in required; developers will likely need to run the included files locally).

To preview locally, open `website/index.html` in a browser, or serve the `website/` folder through a basic static server. To deploy on cPanel, upload **the contents of `website/`** into `public_html/`, preserving the `assets/` directory and relative URLs. Do not upload this README as customer-facing site content.

## 2. Client and design brief

- Business: **NN Glass (Pty) Ltd**, Midrand, Gauteng, South Africa.
- Logo tagline: **Professional service provider**.
- Services advertised on the public Facebook page: glass replacements, mirrors, window and door installations, glass and stainless-steel balustrades. One public post also mentions cottage panels. Verify the complete service list with the client before launch.
- Public Facebook contact number currently shown: **+27 78 486 5809**. Confirm with client before finalising all buttons.
- Visual direction approved in principle by the marketing lead: premium black/charcoal, white and electric cyan. Current CSS palette includes `#080b0e`, `#65c9e8` and `#f3f7f9` with large editorial serif headings and clean sans-serif navigation.
- Preserve the layout and identity unless changes are agreed. This is deliberately **one page**, not an e-commerce or multi-page development.
- Lead-generation goal: make it quick for prospects to request quotes via WhatsApp, phone or a simple enquiry form.

Current sections: top navigation and hero, quick service highlights, service cards, editorial/about, photo gallery, social channels, quotation process, contact/enquiry, footer.

## 3. Domain and business email — confirmation required

- **Proposed website domain:** `nnglassbalustrade.co.za` (spelled B-A-L-U-S-T-R-A-D-E). Not yet confirmed registered or available.
- **Client's stated desired email:** `info@nnglass.co.za`.
- **Alternative under discussion:** `info@nnglassbalustrade.co.za`, to match the proposed website domain. **Do not change the email choice or register either domain without client confirmation.**
- To issue `info@nnglass.co.za`, the client must control **nnglass.co.za** and have DNS/email hosting configured for that separate domain. Owning only `nnglassbalustrade.co.za` does not automatically enable `@nnglass.co.za` addresses. Verify domain ownership/availability and budget implications.
- Public Facebook currently references an older website `nnglassrepairs.co.za` and mailbox `info@nnglassrepairs.co.za`. A check on 11 November 2026 showed a "temporarily unavailable" page. Establish whether the client owns the old domain or any existing mailbox data before changing DNS or migrating email.

## 4. Social media

- Facebook: `https://www.facebook.com/profile.php?id=61577743782545`
- Instagram: `https://www.instagram.com/nnglass06/` — linked from Facebook, verify live profile.
- TikTok: `https://www.tiktok.com/@nnglass8` — derived from the TikTok handle displayed on Facebook, verify correct link.
- YouTube: **Channel URL not yet supplied**. Current preview has a labelled, non-clickable placeholder. Only make it active when the client supplies the actual channel URL.

The preview contains visible social buttons below the photo gallery, plus footer links.

## 5. Required changes before production

1. Replace **all sample/stock images** with clear, real photographs from NN Glass's own completed jobs. The marketing lead explicitly requests authentic images, no AI-generated substitutes or misleading project claims. Verify permission and captions; preserve the real appearance of the work.
2. Confirm final logo, service list, contact number, working hours (if shown) and areas served with the client.
3. Finalise and register/point the chosen domain. Prefer a South African host offering cPanel/static file hosting, business email, reliable SSL, backups and adequate storage. Initial budget is **approximately R500 for domain + first month hosting**.
4. Install and test SSL/HTTPS, redirects, DNS, SPF, DKIM, DMARC, MX and the chosen business mailbox. Test sending/receiving and mobile setup. Do not disrupt any current email without a migration plan.
5. Make enquiries **actually work**. The current `enquiry-form` intentionally only prepares an enquiry draft on-screen; it **does not send**. Implement a confirmed WhatsApp-message handoff or a reliable email/contact-form delivery route, and clearly communicate where messages go. The direct hero WhatsApp URL currently points to the publicly listed number.
6. Remove the prototype notice and sample-image disclaimers only **after** genuine photos and final wording are in place. Remove the `<meta name="robots" content="noindex,nofollow">` restriction on the public production site when ready for indexing.
7. Add verified contact info in the contact section, favicon, appropriate page title/meta description and basic local SEO. Add necessary privacy information if collecting personal details through a form.
8. Test mobile and desktop layout, menu, gallery lightbox, forms, links, phone/WhatsApp, social buttons, loading speed and image sizes. Prefer compressed original photos (e.g. WebP/optimised JPEG) while preserving realism.
9. Set up a recoverable backup process and give the marketing lead documented access for routine photo/text changes.

## 6. Roles and handover expectations

The marketing lead wishes to **remain in operational control** of the website and charge the client **R99/month for hosting**, with website maintenance and social management quoted separately. Hosting does not include unlimited content revisions. The web developer is currently offering the initial build/technical help on the house, subject to their agreement.

Recommended ownership arrangement: the client is registrant/legal owner of their domain; the marketing lead manages hosting/site administration under the client's authority; the developer is given the access necessary for the build and then hands over source files, account details and recovery instructions. Avoid sole control resting with one contractor. Use individual secure access where possible and do not send passwords in a normal email.

At handover, please provide: live URL, final source files, domain/registrar details, hosting panel access process, SSL status, mailbox setup instructions, DNS records, backup/restore approach, contact-form delivery details, admin/update instructions and a brief note on ongoing costs.

## 7. Outstanding items

- Confirmation that `nnglassbalustrade.co.za` is the intended website domain and decision on `info@nnglass.co.za` versus matching-domain email.
- Client's original job photographs and any captions/services shown.
- Verification of phone/WhatsApp and service area.
- YouTube channel URL; confirm Instagram and TikTok account links.
- Decision about existing `nnglassrepairs.co.za` website/email and any necessary data migration.
- Final hosting vendor/package and domain availability/checkout cost.

**Do not treat this handover document as authorisation to buy domains, change DNS, migrate email or publish the site. Those actions should follow confirmation by the marketing lead and the client.**
