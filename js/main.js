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

  // Show a simple alert when the contact form is submitted.
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thank you! This form will be connected soon.");
    form.reset();
  });

  if (reviewForm) {
    reviewForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Thank you! Reviews will be connected soon.");
      reviewForm.reset();
    });
  }

  if (careersForm) {
    careersForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Thank you! The application form will be connected soon.");
      careersForm.reset();
    });
  }

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
