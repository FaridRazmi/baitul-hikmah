const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");

if (!bookId) {
  document.getElementById("bookDetail").innerHTML = `
    <div style="text-align:center; padding: 60px 24px; color: var(--primary);">
      <p style="font-size:1.2rem;">No book selected. <a href="catalogue.html" style="color:var(--primary); font-weight:600;">Browse the catalogue</a>.</p>
    </div>`;
} else {
  fetch("../data/books.json")
    .then((response) => response.json())
    .then((data) => {
      const selectedBook = data.find((book) => book.id == bookId);
      if (!selectedBook) {
        document.getElementById("bookDetail").innerHTML = `
          <div style="text-align:center; padding: 60px 24px; color: var(--primary);">
            <p style="font-size:1.2rem;">Book not found. <a href="catalogue.html" style="color:var(--primary); font-weight:600;">Back to catalogue</a>.</p>
          </div>`;
        return;
      }
      displayBookDetails(selectedBook);
    });
}

function displayBookDetails(book) {
  const container = document.getElementById("bookDetail");

  let stars = "";
  for (let i = 0; i < Math.floor(book.rating); i++) {
    stars += "★";
  }

  container.innerHTML = `
        <div class="detail-container">
          <div class="detail-top">
            <div class="detail-left">
              <img src="${book.image}" class="detail-img">
            </div>
            <div class="detail-right">
              <p>Title : ${book.title}</p>
              <p>Genre : ${book.category}</p>
              <p>Author : ${book.author}</p>
              <p>Description: ${book.synopsis}</p>
            </div>
          </div>
          <div class="detail-actions">
            <button class="status-btn">Status: Available</button>
            <button class="borrow-btn" onclick="addToBag(${book.id})">Add to Bag</button>
          </div>
          <div class="detail-rating">
            <p>Rating: <span class="stars">${stars}</span></p>
          </div>
          <a href="catalogue.html" class="back-link">⬅ Back to Catalogue</a>
        </div>
    `;
}

window.addToBag = function (bookId) {
  let bag = JSON.parse(localStorage.getItem("bag")) || [];
  if (!bag.includes(bookId)) {
    bag.push(bookId);
    localStorage.setItem("bag", JSON.stringify(bag));
    alert("Book added to bag!");
  } else {
    alert("Book is already in the bag!");
  }
};
