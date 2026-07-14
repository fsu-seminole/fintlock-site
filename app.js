(function () {
  "use strict";

  const body = document.body;
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".primary-nav");

  function closeNavigation() {
    body.classList.remove("nav-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const isOpen = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeNavigation();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) {
        closeNavigation();
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (year) {
    year.textContent = String(new Date().getFullYear());
  });

  const form = document.querySelector("[data-contact-form]");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.reportValidity()) {
        return;
      }

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const company = String(data.get("company") || "").trim();
      const message = String(data.get("message") || "").trim();
      const subject = "Project inquiry from " + name;
      const bodyLines = [
        "Name: " + name,
        "Email: " + email,
        company ? "Company or link: " + company : "",
        "",
        "What needs to work better?",
        message
      ].filter(function (line, index) {
        return line || index === 3;
      });
      const mailto = "mailto:contact@fintlock.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(bodyLines.join("\n"));
      const status = form.querySelector(".form-status");

      if (status) {
        status.textContent = "Your email application should open with the project note ready to send.";
      }
      window.location.href = mailto;
    });
  }
}());
