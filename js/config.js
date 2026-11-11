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
   *         other concept notes.
   * false = live site: hides them.
   * Only switch to false once the client has approved the photographs and wording.
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
   *   2. Upload it to the images/projects/ folder.
   *   3. Add a line to the list below, for example:
   *
   *      { src: "images/projects/staircase-balustrade.jpg",
   *        title: "Staircase balustrade",
   *        alt: "Frameless glass balustrade on a staircase" },
   *
   * "title" is the caption under the photo. "alt" describes the photo for
   * Google and for visitors using screen readers.
   */
  gallery: [
    { src: "images/projects/frameless-patio-enclosure.webp",
      title: "Frameless patio enclosure",
      alt: "Frameless glass panels enclosing a brick patio" },
    { src: "images/projects/frameless-stacking-doors.webp",
      title: "Frameless stacking doors",
      alt: "Wide run of frameless stacking glass doors under a concrete canopy" },
    { src: "images/projects/aluminium-entrance.webp",
      title: "Double-volume entrance",
      alt: "Aluminium-framed entrance door with windows above and alongside" },
    { src: "images/projects/aluminium-windows-doors.webp",
      title: "Windows & folding doors",
      alt: "Black aluminium windows and folding doors fitted to a new build" }
  ]
};
