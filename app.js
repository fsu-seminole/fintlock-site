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

      const status = form.querySelector(".form-status");
      const button = form.querySelector("button[type=submit]");
      button.disabled = true;
      button.textContent = "Sending...";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      }).then(function (response) {
        if (!response.ok) { throw new Error("send failed"); }
        form.reset();
        if (status) { status.textContent = "Thanks. We will reply within a day."; }
      }).catch(function () {
        if (status) { status.textContent = "Something went wrong. Email us at contact@fintlock.com."; }
      }).finally(function () {
        button.disabled = false;
        button.textContent = "Send message";
      });
    });
  }
}());
