document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");
  const form = document.querySelector("#contactForm");
  const careersForm = document.querySelector("#careersForm");

  // Toggle navigation menu on mobile.
  navToggle.addEventListener("click", function () {
    const isExpanded = mainNav.classList.toggle("open");
    navToggle.classList.toggle("open", isExpanded);
    navToggle.setAttribute("aria-expanded", String(isExpanded));
  });

  // Close mobile menu after selecting a link.
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      if (mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }

      // Smooth scroll for older browsers.
      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#")) {
        event.preventDefault();
        document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const modalTrigger = document.querySelector(".footer-credit-trigger");
  const modalOverlay = document.querySelector("#siteCreditModal");
  const modalCard = modalOverlay?.querySelector(".modal-card");
  const modalClose = modalOverlay?.querySelector(".modal-close");
  let previouslyFocusedElement = null;

  function getModalFocusableElements() {
    if (!modalCard) return [];

    return Array.from(
      modalCard.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function openModal() {
    if (!modalOverlay || modalOverlay.classList.contains("active")) return;
    previouslyFocusedElement = document.activeElement;
    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    (modalClose || modalCard)?.focus();
  }

  function closeModal() {
    if (!modalOverlay || !modalOverlay.classList.contains("active")) return;
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    previouslyFocusedElement?.focus();
    previouslyFocusedElement = null;
  }

  if (modalTrigger) {
    modalTrigger.addEventListener("click", openModal);
    modalTrigger.addEventListener("keypress", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal();
      }
    });
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
    modalCard?.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (!modalOverlay?.classList.contains("active")) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key !== "Tab") return;

    const focusableElements = getModalFocusableElements();
    if (focusableElements.length === 0) {
      event.preventDefault();
      modalCard?.focus();
      return;
    }

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    const focusIsOutsideModal = !modalCard?.contains(document.activeElement);

    if (event.shiftKey && (document.activeElement === firstFocusableElement || focusIsOutsideModal)) {
      event.preventDefault();
      lastFocusableElement.focus();
    } else if (!event.shiftKey && (document.activeElement === lastFocusableElement || focusIsOutsideModal)) {
      event.preventDefault();
      firstFocusableElement.focus();
    }
  });

  // IntersectionObserver to reveal sections on scroll.
  const revealSections = document.querySelectorAll(".reveal-section");

  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealSections.forEach((section) => observer.observe(section));
  } else {
    revealSections.forEach((section) => section.classList.add("active"));
  }
});
