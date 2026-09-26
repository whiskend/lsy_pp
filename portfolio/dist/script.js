"use strict";

document.getElementById("year").textContent = new Date().getFullYear();

const preview = document.getElementById("film-preview");
const motionButton = document.querySelector(".motion-toggle");
const motionText = motionButton.querySelector(".motion-text");
const motionIcon = motionButton.querySelector(".motion-icon");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let playing = false;

function setMotion(shouldPlay) {
  playing = shouldPlay;
  preview.src = shouldPlay
    ? preview.dataset.motionSrc
    : preview.dataset.stillSrc;
  motionText.textContent = shouldPlay ? "미리보기 일시정지" : "미리보기 재생";
  motionIcon.textContent = shouldPlay ? "Ⅱ" : "▷";
}

// Keep the poster and YouTube link usable if GIF loading fails.
preview.addEventListener("error", () => {
  if (playing) {
    setMotion(false);
    motionButton.hidden = true;
  }
});
motionButton.addEventListener("click", () => setMotion(!playing));
reducedMotion.addEventListener("change", (event) => setMotion(!event.matches));
motionButton.hidden = false;
setMotion(!reducedMotion.matches);
