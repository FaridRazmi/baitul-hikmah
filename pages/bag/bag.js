function loadBag() {
  let bag = JSON.parse(localStorage.getItem("bag")) || [];
  const container = document.getElementById("bookContainer");

  if (bag.length === 0) {
    container.innerHTML =
      "<p class='empty-bag'>Your bag is empty. <a href='../catalogue/catalogue.html'>Browse books</a></p>";
    document.getElementById("checkoutContainer").innerHTML = "";
    return;
  }

  fetch("../../data/books.json")
    .then((res) => res.json())
    .then((data) => {
      const bagBooks = data.filter((book) => bag.includes(book.id));
      container.innerHTML = "";
      bagBooks.forEach((book) => {
        container.innerHTML += `
          <div class="book-card">
            <img src="${book.image}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <button onclick="removeFromBag(${book.id})">Remove</button>
          </div>
        `;
      });
      document.getElementById("checkoutContainer").innerHTML = `
        <a href="../borrower/borrower-details.html"><button class="borrow-now-btn">Borrow Now</button></a>
      `;
    });
}

window.removeFromBag = function (bookId) {
  let bag = JSON.parse(localStorage.getItem("bag")) || [];
  bag = bag.filter((id) => id !== bookId);
  localStorage.setItem("bag", JSON.stringify(bag));
  loadBag();
};

loadBag();
