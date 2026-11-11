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
  /*
   * true  = concept preview: shows the "private design concept" strip and the
   *         "stock photograph" labels.
   * false = live site: hides all of those notices.
   * Only switch to false once genuine NN Glass photographs are in place.
   */
  previewMode: true,

  // TODO: number is from the public Facebook page — confirm with the client.
  phoneDisplay: "+27 78 486 5809",
  // Same number, digits only, starting with 27.
  phoneIntl: "27784865809",

  // Leave empty ("") until the client confirms the address; the email row
  // on the page stays hidden while this is empty.
  email: "",

  // Message pre-filled when a visitor taps a WhatsApp button.
  whatsappGreeting: "Hello NN Glass, I'd like a quotation.",

  // Leave a link empty ("") to hide it.
  // TODO: verify the Instagram and TikTok links; add YouTube when supplied.
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61577743782545",
    instagram: "https://www.instagram.com/nnglass06/",
    tiktok: "https://www.tiktok.com/@nnglass8",
    youtube: ""
  },

  /*
   * Gallery. The live site must only show genuine NN Glass projects.
   *
   * To add a photo:
   *   1. Save it as a JPG or WebP, about 1600px on the long side, under 300 KB
   *      (squoosh.app does this for free in the browser).
   *   2. Upload it to the images/gallery/ folder.
   *   3. Add a line to the list below, for example:
   *
   *      { src: "images/gallery/staircase-balustrade.jpg",
   *        title: "Staircase balustrade",
   *        alt: "Frameless glass balustrade on a staircase" },
   *
   * "title" is the caption under the photo. "alt" describes the photo for
   * Google and for visitors using screen readers.
   *
   * The three entries below are STOCK photographs from the concept.
   * Delete them when the client's own photographs go in.
   */
  gallery: [
    { src: "images/sample/glass-doors.webp",
      title: "Windows & doors",
      alt: "Black framed glass doors and windows" },
    { src: "images/sample/architecture.webp",
      title: "Modern glazing",
      alt: "Contemporary architecture with glass facade" },
    { src: "images/sample/modern-home-1600.webp",
      title: "Light-filled spaces",
      alt: "Modern house with expansive glass openings" }
  ]
};
