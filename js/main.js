(function () {
  "use strict";

  var site = window.NN_SITE || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function waLink(text) {
    return "https://wa.me/" + site.phoneIntl + "?text=" + encodeURIComponent(text || site.whatsappGreeting || "");
  }

  /* ---- Preview / live mode ---- */
  if (site.previewMode === false) document.documentElement.classList.add("is-live");

  /* ---- Contact details from config.js ---- */
  if (site.phoneIntl) {
    $$("[data-wa]").forEach(function (a) { a.href = waLink(); });
    $$("[data-tel]").forEach(function (a) { a.href = "tel:+" + site.phoneIntl; });
  }
  if (site.phoneDisplay) {
    $$("[data-tel-text]").forEach(function (el) { el.textContent = site.phoneDisplay; });
  }
  if (site.email) {
    $$("[data-email]").forEach(function (a) {
      a.href = "mailto:" + site.email;
      a.textContent = site.email;
    });
    $$("[data-email-row]").forEach(function (row) { row.hidden = false; });
  }
  var socials = site.socials || {};
  $$("[data-social]").forEach(function (a) {
    var url = socials[a.getAttribute("data-social")];
    if (url) a.href = url;
    a.hidden = !url;
  });
  $$("[data-social-pending]").forEach(function (el) {
    el.hidden = Boolean(socials[el.getAttribute("data-social-pending")]);
  });
  $("#year").textContent = new Date().getFullYear();

  /* ---- Mobile menu ---- */
  var toggle = $("#menu-toggle");
  var nav = $("#primary-nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---- Floating WhatsApp button: step aside while the contact section is on screen ---- */
  var float = $(".wa-float");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      float.classList.toggle("is-away", entries[0].isIntersecting);
    }, { threshold: 0.15 }).observe($("#contact"));
  }

  /* ---- Gallery ---- */
  var photos = (site.gallery || []).filter(function (p) { return p && p.src; });
  var grid = $("#gallery-grid");

  photos.forEach(function (p, i) {
    var item = document.createElement("button");
    item.type = "button";
    item.className = "gallery-item";
    item.setAttribute("data-index", i);

    var frame = document.createElement("div");
    frame.className = "gallery-img";
    var img = document.createElement("img");
    img.src = p.src;
    img.alt = p.alt || p.title || "NN Glass project";
    img.loading = "lazy";
    img.decoding = "async";
    frame.appendChild(img);

    var caption = document.createElement("div");
    caption.className = "photo-title";
    var title = document.createElement("strong");
    title.textContent = p.title || "";
    var view = document.createElement("span");
    view.textContent = "VIEW IMAGE →";
    caption.appendChild(title);
    caption.appendChild(view);

    item.appendChild(frame);
    item.appendChild(caption);
    grid.appendChild(item);
  });

  /* ---- Lightbox ---- */
  var box = $("#lightbox");
  var boxImg = $("#lightbox-image");
  var boxCap = $("#lightbox-caption");
  var current = 0;

  function show(i) {
    current = (i + photos.length) % photos.length;
    boxImg.src = photos[current].src;
    boxImg.alt = photos[current].alt || "";
    boxCap.textContent = photos[current].title || "";
  }
  grid.addEventListener("click", function (e) {
    var item = e.target.closest(".gallery-item");
    if (!item || !box.showModal) return;
    show(Number(item.getAttribute("data-index")));
    box.showModal();
  });
  $("#lightbox-close").addEventListener("click", function () { box.close(); });
  $("#lightbox-prev").addEventListener("click", function () { show(current - 1); });
  $("#lightbox-next").addEventListener("click", function () { show(current + 1); });
  box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
  box.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  /* ---- Enquiry form ---- */
  var form = $("#enquiry-form");
  var status = $("#form-status");
  var submit = $("button[type=submit]", form);
  var prompts = {
    name: "Please enter your name.",
    phone: "Please enter a contact number.",
    service: "Please choose what you need.",
    message: "Please tell us a little about your project."
  };
  form.elements.started.value = Math.floor(Date.now() / 1000);

  function setStatus(text, kind) {
    status.textContent = text;
    status.className = "form-status" + (kind ? " is-" + kind : "");
  }

  // Returns true when the listed fields are filled in; otherwise shows a prompt.
  function check(names) {
    for (var i = 0; i < names.length; i++) {
      var el = form.elements[names[i]];
      if (!el.checkValidity()) {
        setStatus(prompts[names[i]], "error");
        el.focus();
        return false;
      }
    }
    return true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!check(["name", "phone", "service", "message"])) return;
    submit.disabled = true;
    setStatus("Sending…");
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        return res.json().then(function (data) { return { ok: res.ok && data.ok, message: data.message }; });
      })
      .then(function (r) {
        setStatus(r.message, r.ok ? "ok" : "error");
        if (r.ok) {
          form.reset();
          form.elements.started.value = Math.floor(Date.now() / 1000);
        }
      })
      .catch(function () {
        setStatus("We could not send your enquiry. Please use the WhatsApp button instead.", "error");
      })
      .then(function () { submit.disabled = false; });
  });

  $("#form-whatsapp").addEventListener("click", function () {
    if (!check(["name", "message"])) return;
    var f = form.elements;
    var lines = ["Hello NN Glass, I would like to enquire about a project.", "", "Name: " + f.name.value.trim()];
    if (f.service.value) lines.push("Project: " + f.service.value);
    lines.push("Details: " + f.message.value.trim());
    setStatus("WhatsApp is opening with your message. Press send there to reach us.", "ok");
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  });

  // Result of a submit made with JavaScript unavailable, after the redirect back.
  var result = new URLSearchParams(location.search).get("enquiry");
  if (result === "sent") setStatus("Thank you — your enquiry has been sent. We will be in touch shortly.", "ok");
  if (result === "error") setStatus("We could not send your enquiry. Please call or WhatsApp us instead.", "error");
})();
