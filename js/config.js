/*
 * NN Glass — site settings.
 *
 * This is the one file to edit for day-to-day updates: contact details,
 * social links and the project gallery. No coding knowledge needed —
 * change the text between the quotes, save, and upload the file.
 *
 * The enquiry form's recipient address lives in api/config.php (it has to
 * stay on the server so spammers cannot read it).
 */
window.NN_SITE = {
  // Shown on the page. TODO: number is subject to final client confirmation.
  phoneDisplay: "078 486 5809",
  // Same number in international format, digits only (27 replaces the leading 0).
  phoneIntl: "27784865809",

  // TODO: confirm with client — info@nnglass.co.za or info@nnglassbalustrade.co.za.
  email: "info@nnglassbalustrade.co.za",

  // Message pre-filled when a visitor taps a WhatsApp button.
  whatsappGreeting: "Hi NN Glass, I'd like a quote please.",

  // Leave a link empty ("") to hide its icon.
  // TODO: Instagram and TikTok came from the Facebook page — verify before launch.
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61577743782545",
    instagram: "https://www.instagram.com/nnglass06/",
    tiktok: "https://www.tiktok.com/@nnglass8",
    youtube: ""
  },

  /*
   * Completed-project gallery. Genuine NN Glass project photos only.
   *
   * To add a photo:
   *   1. Save it as a JPG or WebP, about 1600px on the long side, under 300 KB.
   *   2. Upload it to the images/gallery/ folder.
   *   3. Add a line below. "category" must be one of:
   *      "Balustrades", "Windows & Doors", "Mirrors & Custom Glass", "Repairs"
   *
   * Example:
   *   { src: "images/gallery/balustrade-waterfall.jpg",
   *     alt: "Frameless glass balustrade on a staircase in Waterfall",
   *     category: "Balustrades" },
   *
   * While this list is empty the page shows "photo coming soon" tiles.
   */
  gallery: [
  ]
};
