/* ── catalogue.js ── */
let allBooks      = [];
let filteredBooks = [];
let currentPage   = 1;
const BOOKS_PER_PAGE = 8;

// ── Element refs ──
const searchInput        = document.getElementById('searchInput');
const searchInputMobile  = document.getElementById('searchInputMobile');
const categoryFilter     = document.getElementById('categoryFilter');
const categoryFilterMob  = document.getElementById('categoryFilterMobile');
const bookContainer      = document.getElementById('bookContainer');
const resultsCount       = document.getElementById('resultsCount');
const paginationEl       = document.getElementById('pagination');

// ── Load books ──
fetch('../data/books.json')
  .then(r => r.json())
  .then(data => {
    allBooks = data;

    // Apply URL query params on first load
    const params = new URLSearchParams(window.location.search);
    if (params.get('search')) {
      searchInput.value       = params.get('search');
      searchInputMobile.value = params.get('search');
    }
    if (params.get('category')) {
      const cat = params.get('category');
      setSelectValue(categoryFilter, cat);
      setSelectValue(categoryFilterMob, cat);
    }

    applyFilters();
  });

function setSelectValue(select, val) {
  for (let opt of select.options) {
    if (opt.value === val) { opt.selected = true; break; }
  }
}

// ── Sync desktop → mobile and mobile → desktop ──
searchInput.addEventListener('input', () => {
  searchInputMobile.value = searchInput.value;
  currentPage = 1;
  applyFilters();
});

searchInputMobile.addEventListener('input', () => {
  searchInput.value = searchInputMobile.value;
  currentPage = 1;
  applyFilters();
});

categoryFilter.addEventListener('change', () => {
  setSelectValue(categoryFilterMob, categoryFilter.value);
  currentPage = 1;
  applyFilters();
});

categoryFilterMob.addEventListener('change', () => {
  setSelectValue(categoryFilter, categoryFilterMob.value);
  currentPage = 1;
  applyFilters();
});

// ── Filter logic ──
function applyFilters() {
  const search   = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;

  filteredBooks = allBooks.filter(book => {
    const matchSearch   = book.title.toLowerCase().includes(search) ||
                          book.author.toLowerCase().includes(search);
    const matchCategory = category === 'all' || book.category === category;
    return matchSearch && matchCategory;
  });

  renderPage(currentPage);
}

// ── Render one page of results ──
function renderPage(page) {
  currentPage = page;
  const total      = filteredBooks.length;
  const totalPages = Math.max(1, Math.ceil(total / BOOKS_PER_PAGE));

  // Guard bounds
  if (currentPage < 1)          currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * BOOKS_PER_PAGE;
  const slice = filteredBooks.slice(start, start + BOOKS_PER_PAGE);

  // ── Results count ──
  const searchVal = searchInput.value.trim();
  if (searchVal || categoryFilter.value !== 'all') {
    resultsCount.textContent = `${total} result${total !== 1 ? 's' : ''} found`;
  } else {
    resultsCount.textContent = `${total} book${total !== 1 ? 's' : ''} in collection`;
  }

  // ── Book grid ──
  if (total === 0) {
    bookContainer.innerHTML = `
      <p style="text-align:center; color:var(--primary); padding:60px 0; font-size:1.1rem; grid-column:1/-1;">
        No books found. Try a different search or filter.
      </p>`;
  } else {
    bookContainer.innerHTML = slice.map(book => `
      <div class="book-card">
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p>${book.category}</p>
        <p>Rating: ${book.rating}</p>
        <div class="card-spacer"></div>
        <button onclick="goToDetails(${book.id})">View Details</button>
      </div>
    `).join('');
  }

  // ── Pagination ──
  renderPagination(totalPages);
}

// ── Pagination buttons ──
function renderPagination(totalPages) {
  if (totalPages <= 1) {
    paginationEl.innerHTML = '';
    return;
  }

  let html = '';

  // Prev
  html += `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}"
    onclick="renderPage(${currentPage - 1})"
    ${currentPage === 1 ? 'disabled' : ''}>‹ Prev</button>`;

  // Page numbers — show at most 5 around current
  const range = getPageRange(currentPage, totalPages);
  if (range[0] > 1) {
    html += `<button class="page-btn" onclick="renderPage(1)">1</button>`;
    if (range[0] > 2) html += `<span class="page-ellipsis">…</span>`;
  }

  range.forEach(p => {
    html += `<button class="page-btn ${p === currentPage ? 'active' : ''}"
      onclick="renderPage(${p})">${p}</button>`;
  });

  if (range[range.length - 1] < totalPages) {
    if (range[range.length - 1] < totalPages - 1) html += `<span class="page-ellipsis">…</span>`;
    html += `<button class="page-btn" onclick="renderPage(${totalPages})">${totalPages}</button>`;
  }

  // Next
  html += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}"
    onclick="renderPage(${currentPage + 1})"
    ${currentPage === totalPages ? 'disabled' : ''}>Next ›</button>`;

  paginationEl.innerHTML = html;

  // Scroll to top of grid smoothly
  bookContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getPageRange(cur, total, delta = 2) {
  const range = [];
  for (let i = Math.max(1, cur - delta); i <= Math.min(total, cur + delta); i++) {
    range.push(i);
  }
  return range;
}

function goToDetails(bookId) {
  window.location.href = `book.html?id=${bookId}`;
}
