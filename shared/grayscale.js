function setGrayscale(enabled) {
  document.body.classList.toggle('grayscale', enabled);
  localStorage.setItem('grayscale', enabled ? '1' : '0');
}

function toggleGrayscale() {
  setGrayscale(!document.body.classList.contains('grayscale'));
}

function restoreGrayscale() {
  if (localStorage.getItem('grayscale') === '1') {
    document.body.classList.add('grayscale');
  }
}

document.addEventListener('DOMContentLoaded', restoreGrayscale);
