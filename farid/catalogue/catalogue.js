let allBooks = [];

fetch("../data/books.json")
  .then((response) => response.json())
  .then((data) => {
    allBooks = data;
    displayBooks(allBooks);
  });

function goToDetails(bookId) {
  window.location.href = `book.html?id=${bookId}`;
}

function displayBooks(books) {
  const container = document.getElementById("bookContainer");
  container.innerHTML = "";

  books.forEach((book) => {
    container.innerHTML += `
        <div class="book-card">
                <img src="${book.image}">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.category}</p>
                <p>Rating: ${book.rating}</p>
                <button onclick="goToDetails(${book.id})">View Details</button>
            </div>
        `;
  });
}

document.getElementById("searchInput").addEventListener("input", applyFilters);
document
  .getElementById("categoryFilter")
  .addEventListener("change", applyFilters);

function applyFilters() {
  let searchValue = document.getElementById("searchInput").value.toLowerCase();
  let categoryValue = document.getElementById("categoryFilter").value;

  let filteredBooks = allBooks.filter((book) => {
    let matchSearch = book.title.toLowerCase().includes(searchValue);
    let matchCategory =
      categoryValue === "all" || book.category === categoryValue;

    return matchSearch && matchCategory;
  });

  displayBooks(filteredBooks);
}
