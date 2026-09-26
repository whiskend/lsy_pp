"use strict";

const preview = document.getElementById("film-preview");
const motionButton = document.querySelector(".motion-toggle");
const motionText = motionButton.querySelector(".motion-text");
const motionIcon = motionButton.querySelector(".motion-icon");
let playing = false;

function setMotion(shouldPlay) {
  playing = shouldPlay;
  preview.src = shouldPlay
    ? preview.dataset.motionSrc
    : preview.dataset.stillSrc;
  motionText.textContent = shouldPlay ? "미리보기 일시정지" : "미리보기 재생";
  motionIcon.textContent = shouldPlay ? "Ⅱ" : "▷";
}

motionButton.addEventListener("click", () => setMotion(!playing));
motionButton.hidden = false;
setMotion(true);
