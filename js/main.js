document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");
  const form = document.querySelector("#contactForm");
  const reviewForm = document.querySelector("#reviewForm");
  const careersForm = document.querySelector("#careersForm");

  // Toggle navigation menu on mobile.
  navToggle.addEventListener("click", function () {
    const isExpanded = mainNav.classList.toggle("open");
    navToggle.classList.toggle("open", isExpanded);
  });

  // Close mobile menu after selecting a link.
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      if (mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        navToggle.classList.remove("open");
      }

      // Smooth scroll for older browsers.
      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#")) {
        event.preventDefault();
        document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  if (reviewForm) {
    reviewForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Thank you! Reviews will be connected soon.");
      reviewForm.reset();
    });
  }

  const modalTrigger = document.querySelector(".footer-credit-trigger");
  const modalOverlay = document.querySelector("#siteCreditModal");
  const modalCard = modalOverlay?.querySelector(".modal-card");
  const modalClose = modalOverlay?.querySelector(".modal-close");

  function openModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
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
    if (event.key === "Escape" && modalOverlay?.classList.contains("active")) {
      closeModal();
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
