function toggleMap() {
  const map = document.getElementById('map-container');
  const btn = document.getElementById('map-btn');

  map.classList.toggle('open');
  btn.textContent = map.classList.contains('open') ? '❌ Hide Location' : '📍 View Location';
}