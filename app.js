// Fintlock site behaviour: mobile navigation, footer year, contact form.

(function () {
  "use strict";

  // Mobile navigation toggle
  const toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    // Close the menu with Escape for keyboard users
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // Current year in footer
  const year = document.querySelector("[data-year]");
  if (year) { year.textContent = String(new Date().getFullYear()); }

  // Contact form — no backend. Compose a pre-filled email to the studio so the
  // submission actually goes somewhere, then confirm honestly.
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const value = function (name) {
        const field = form.elements[name];
        return field ? field.value.trim() : "";
      };
      const topic = value("topic");
      const subject = "Fintlock enquiry" + (topic ? " — " + topic : "");
      const body =
        "Name: " + value("name") + "\n" +
        "Email: " + value("email") + "\n" +
        "Topic: " + topic + "\n\n" +
        value("message");
      const msg = form.querySelector(".form-msg");
      if (msg) { msg.classList.add("show"); }
      window.location.href =
        "mailto:hello@fintlock.com?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }
})();
