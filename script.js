// Portfolio interactions: current year, mobile menu, scroll reveal, typing effect.
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("nav-links");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      navLinks.classList.toggle("open", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  // Reveal sections and animate skill bars as they enter the viewport.
  const revealElements = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible", "in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible", "in-view"));
  }

  // Typing animation
  const typedText = document.getElementById("typed-text");
  if (!typedText) return;

  const roles = ["Java Developer", "Software Developer", "Problem Solver"];
  if (reduceMotion) {
    typedText.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = true;
  typedText.textContent = roles[0];

  function typeEffect() {
    const role = roles[roleIndex];

    if (deleting) {
      charIndex = Math.max(0, charIndex - 1);
      typedText.textContent = role.slice(0, charIndex);
    } else {
      charIndex = Math.min(role.length, charIndex + 1);
      typedText.textContent = role.slice(0, charIndex);
    }

    let delay = deleting ? 42 : 85;

    if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 280;
    } else if (!deleting && charIndex === roles[roleIndex].length) {
      deleting = true;
      delay = 1250;
    }

    window.setTimeout(typeEffect, delay);
  }

  window.setTimeout(typeEffect, 1250);
});
