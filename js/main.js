(function () {
  "use strict";

  var site = window.NN_SITE || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function waLink(text) {
    return "https://wa.me/" + site.phoneIntl + "?text=" + encodeURIComponent(text || site.whatsappGreeting || "");
  }

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
  }
  if (site.socials) {
    $$("[data-social]").forEach(function (a) {
      var url = site.socials[a.getAttribute("data-social")];
      var holder = a.parentElement.tagName === "LI" ? a.parentElement : a;
      if (url) {
        a.href = url;
        holder.hidden = false;
      } else {
        holder.hidden = true;
      }
    });
  }
  $("#year").textContent = new Date().getFullYear();

  /* ---- Mobile menu ---- */
  var toggle = $(".nav-toggle");
  var nav = $("#nav");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---- Gallery ---- */
  var photos = (site.gallery || []).filter(function (p) { return p && p.src; });
  var grid = $("#gallery-grid");
  var filters = $("#gallery-filters");
  var visible = photos;

  function renderGallery(category) {
    visible = category ? photos.filter(function (p) { return p.category === category; }) : photos;
    grid.textContent = "";
    visible.forEach(function (p, i) {
      var li = document.createElement("li");
      li.className = "tile";
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-index", i);
      var img = document.createElement("img");
      img.src = p.src;
      img.alt = p.alt || "NN Glass completed project";
      img.loading = "lazy";
      img.decoding = "async";
      btn.appendChild(img);
      if (p.category) {
        var tag = document.createElement("span");
        tag.className = "tile__tag";
        tag.textContent = p.category;
        btn.appendChild(tag);
      }
      li.appendChild(btn);
      grid.appendChild(li);
    });
  }

  if (photos.length) {
    var cats = [];
    photos.forEach(function (p) {
      if (p.category && cats.indexOf(p.category) === -1) cats.push(p.category);
    });
    if (cats.length > 1) {
      [""].concat(cats).forEach(function (c, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "chip";
        b.textContent = c || "All";
        b.setAttribute("aria-pressed", String(i === 0));
        b.addEventListener("click", function () {
          $$(".chip", filters).forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
          b.setAttribute("aria-pressed", "true");
          renderGallery(c);
        });
        filters.appendChild(b);
      });
      filters.hidden = false;
    }
    renderGallery("");
  }

  /* ---- Lightbox ---- */
  var box = $("#lightbox");
  var boxImg = $("#lightbox-img");
  var boxCap = $("#lightbox-cap");
  var current = 0;

  function show(i) {
    current = (i + visible.length) % visible.length;
    boxImg.src = visible[current].src;
    boxImg.alt = visible[current].alt || "";
    boxCap.textContent = visible[current].alt || "";
  }
  grid.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-index]");
    if (!btn || !box.showModal) return;
    show(Number(btn.getAttribute("data-index")));
    box.showModal();
  });
  $(".lightbox__close").addEventListener("click", function () { box.close(); });
  $(".lightbox__nav--prev").addEventListener("click", function () { show(current - 1); });
  $(".lightbox__nav--next").addEventListener("click", function () { show(current + 1); });
  box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
  box.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  /* ---- Enquiry form ---- */
  var form = $("#enquiry-form");
  var status = $("#form-status");
  var submit = $("button[type=submit]", form);
  form.elements.started.value = Math.floor(Date.now() / 1000);

  function setStatus(text, kind) {
    status.textContent = text;
    status.className = "form__status" + (kind ? " is-" + kind : "");
  }

  function validate() {
    var bad = $$("input, select, textarea", form).filter(function (el) { return !el.checkValidity(); })[0];
    if (!bad) return true;
    var label = bad.closest("label").firstChild.textContent.trim().toLowerCase();
    setStatus(bad.validity.valueMissing ? "Please fill in your " + (label === "what do you need?" ? "message" : label) + "." : "Please check your " + label + ".", "error");
    bad.focus();
    return false;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;
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
    var f = form.elements;
    var lines = ["Hi NN Glass, I'd like a quote please."];
    if (f.name.value.trim()) lines.push("Name: " + f.name.value.trim());
    if (f.service.value) lines.push("Service: " + f.service.value);
    if (f.message.value.trim()) lines.push(f.message.value.trim());
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  });

  // Result of a no-JavaScript style submit that redirected back here.
  var result = new URLSearchParams(location.search).get("enquiry");
  if (result === "sent") setStatus("Thank you — your enquiry has been sent. We will be in touch shortly.", "ok");
  if (result === "error") setStatus("We could not send your enquiry. Please call or WhatsApp us instead.", "error");
})();
