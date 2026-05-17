function setGrayscale(enabled) {
  document.documentElement.classList.toggle("grayscale", enabled);
  localStorage.setItem("grayscale", enabled ? "1" : "0");
}

function toggleGrayscale() {
  setGrayscale(!document.documentElement.classList.contains("grayscale"));
}

function restoreGrayscale() {
  if (localStorage.getItem("grayscale") === "1") {
    document.documentElement.classList.add("grayscale");
  }
}

document.addEventListener("DOMContentLoaded", restoreGrayscale);
