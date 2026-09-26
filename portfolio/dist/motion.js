"use strict";

(() => {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (preference.matches || typeof Element.prototype.animate !== "function") {
    return;
  }

  const activeAnimations = new Set();
  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

  function reveal(element, delay = 0, distance = 18) {
    if (!element || preference.matches) return;

    // Content stays visible if JavaScript or animation support is unavailable.
    const animation = element.animate(
      [
        { opacity: 0, transform: `translateY(${distance}px)` },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 800, delay, easing, fill: "backwards" },
    );
    activeAnimations.add(animation);
    const forget = () => activeAnimations.delete(animation);
    animation.addEventListener("finish", forget, { once: true });
    animation.addEventListener("cancel", forget, { once: true });
  }

  reveal(document.querySelector(".header"));
  reveal(document.querySelector(".section-bar"), 80, 12);
  reveal(document.querySelector(".project-media"), 160, 24);
  reveal(document.querySelector(".project-caption"), 240, 12);
  reveal(document.querySelector(".motion-toggle"), 280, 8);

  let observer;
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );
    for (const element of document.querySelectorAll(".about, footer")) {
      observer.observe(element);
    }
  }

})();
