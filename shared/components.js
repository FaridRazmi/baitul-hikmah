// shared/components.js
// Call renderNavbar() and renderFooter() on each page to inject the shared UI.
// All pages live in pages/X/ so paths are consistent across the whole site.

function renderNavbar(links) {
  const placeholder = document.getElementById('navbar-placeholder');

  // Save any page-specific extras BEFORE the placeholder is replaced
  const mobileToolbar = placeholder.querySelector('.mobile-toolbar');
  const navExtras     = placeholder.querySelector('.catalogue-nav-extras');

  // Build nav links from the array passed in
  const navLinks = links
    .map((link) => `<a href="${link.href}">${link.label}</a>`)
    .join('');

  // Replace the placeholder with the real navbar
  placeholder.outerHTML = `
    <div class="navbar">
      <div class="nav-brand">
        <h2>Baitul Hikmah</h2>
        <div class="hamburger" id="hamburgerBtn">
          <i data-feather="menu"></i>
        </div>
      </div>
      <div class="nav-menu" id="navMenu">
        <div class="nav-links">${navLinks}</div>
        <div class="nav-right">
          <a href="../bag/bag.html" class="bag-icon-link">
            <i data-feather="shopping-bag" style="width: 20px; height: auto"></i>
          </a>
        </div>
      </div>
    </div>
    <hr />`;

  // Put mobile toolbar back into nav-brand (catalogue page only)
  if (mobileToolbar) {
    const hamburger = document.querySelector('.nav-brand .hamburger');
    hamburger.before(mobileToolbar);
  }

  // Put desktop search/filter back into nav-right, before the bag link (catalogue page only)
  if (navExtras) {
    const bagLink = document.querySelector('.nav-right .bag-icon-link');
    while (navExtras.firstChild) {
      bagLink.before(navExtras.firstChild);
    }
  }

  // Hamburger toggle for mobile
  document.getElementById('hamburgerBtn').addEventListener('click', function () {
    document.getElementById('navMenu').classList.toggle('active');
  });
}

function renderFooter() {
  document.getElementById('footer-placeholder').outerHTML = `
    <footer id="contact">
      <div class="footer-logo">Baitul Hikmah</div>
      <p>Knowledge is the light that guides us from cradle to grave.</p>
      <p class="copyright">© 2026 Baitul Hikmah Library. All rights reserved.</p>
    </footer>`;
}
