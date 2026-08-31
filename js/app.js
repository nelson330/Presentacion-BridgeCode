/* =========================================================
   SIMPLE — Deck navigation
   ========================================================= */

(function () {
  "use strict";

  const slides = Array.from(document.querySelectorAll(".slide"));
  const total = slides.length;
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const restartBtn = document.getElementById("restart");
  const dotsContainer = document.getElementById("dots");
  const barFill = document.getElementById("bar");

  let current = 0;
  let wheelLock = false;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir a slide ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function update() {
    slides.forEach((slide, i) => {
      if (i === current) {
        slide.setAttribute("data-active", "");
      } else {
        slide.removeAttribute("data-active");
      }
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === current);
    });
    barFill.style.width = `${((current + 1) / total) * 100}%`;
  }

  function goTo(index) {
    if (index < 0) index = 0;
    if (index >= total) index = total - 1;
    if (index === current) return;
    current = index;
    update();
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  // Buttons
  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
  if (restartBtn) {
    restartBtn.addEventListener("click", () => goTo(0));
  }

  // Keyboard
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
      case " ":
        e.preventDefault();
        next();
        break;
      case "ArrowLeft":
      case "PageUp":
        e.preventDefault();
        prev();
        break;
      case "Home":
        e.preventDefault();
        goTo(0);
        break;
      case "End":
        e.preventDefault();
        goTo(total - 1);
        break;
    }
  });

  // Wheel (with debounce)
  let wheelTimer = null;
  document.addEventListener(
    "wheel",
    (e) => {
      if (wheelLock) return;
      // Only react to vertical-ish wheels
      if (Math.abs(e.deltaY) < 20 && Math.abs(e.deltaX) < 20) return;

      wheelLock = true;
      if (e.deltaY > 0 || e.deltaX > 0) {
        next();
      } else {
        prev();
      }
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        wheelLock = false;
      }, 600);
    },
    { passive: true }
  );

  // Touch swipe
  let touchStartX = 0;
  let touchStartY = 0;
  let touchActive = false;

  document.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchActive = true;
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    (e) => {
      if (!touchActive) return;
      touchActive = false;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      // Only horizontal swipes
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) next();
      else prev();
    },
    { passive: true }
  );

  // Init
  update();
})();