feather.replace();

// Show bag contents
const bag = JSON.parse(localStorage.getItem('bag')) || [];
document.getElementById('checkoutItems').innerHTML =
  bag.length > 0
    ? `<p>${bag.length} book(s) in your bag ready to borrow.</p>`
    : '<p>Your bag is empty. <a href="../farid/catalogue/catalogue.html" style="color:var(--side);">Browse books</a></p>';

function confirmBorrow() {
  const bag = JSON.parse(localStorage.getItem('bag')) || [];
  if (bag.length === 0) {
    alert('Your bag is empty!');
    return;
  }
  localStorage.removeItem('bag');
  document.getElementById('checkoutItems').innerHTML =
    '<p style="font-weight:600;">✅ Borrowing confirmed! Thank you.</p>';
  document.querySelector('.confirm-btn').style.display = 'none';
}
