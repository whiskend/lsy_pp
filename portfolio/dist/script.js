"use strict";

document.getElementById("year").textContent = new Date().getFullYear();

const preview = document.getElementById("film-preview");
const previewArea = document.querySelector(".project-media");
const motionButton = document.querySelector(".motion-toggle");
const motionText = motionButton.querySelector(".motion-text");
const motionIcon = motionButton.querySelector(".motion-icon");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let playing = false;
let motionAvailable = true;

function setMotion(shouldPlay) {
  const nextPlaying = shouldPlay && motionAvailable;
  if (playing !== nextPlaying) {
    preview.src = nextPlaying
      ? preview.dataset.motionSrc
      : preview.dataset.stillSrc;
  }
  playing = nextPlaying;
  previewArea.classList.toggle("is-playing", playing);
  motionText.textContent = playing ? "미리보기 일시정지" : "미리보기 재생";
  motionIcon.textContent = playing ? "Ⅱ" : "▷";
}

previewArea.addEventListener("pointerenter", (event) => {
  if (event.pointerType === "mouse" && !reducedMotion.matches) {
    setMotion(true);
  }
});
previewArea.addEventListener("pointerleave", (event) => {
  if (event.pointerType === "mouse") setMotion(false);
});

// Keep the poster and YouTube link usable if GIF loading fails.
preview.addEventListener("error", () => {
  if (playing) {
    motionAvailable = false;
    setMotion(false);
    motionButton.hidden = true;
  }
});
motionButton.addEventListener("click", () => setMotion(!playing));
reducedMotion.addEventListener("change", () => setMotion(false));
motionButton.hidden = false;
setMotion(false);
