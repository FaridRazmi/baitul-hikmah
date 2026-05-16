feather.replace();

const BOT_TOKEN = '8872790988:AAHZUR1NSRgrB3QIMiQhHqqy26DLij_Qw1s';
const CHAT_ID   = '-5214715009';

const bag      = JSON.parse(localStorage.getItem('bag')) || [];
const borrower = JSON.parse(localStorage.getItem('borrowerDetails'));

// ── Show borrower info ──
if (borrower) {
  document.getElementById('borrowerInfo').innerHTML = `
    <div class="info-section">
      <h3 class="section-title">Borrower Details</h3>
      <div class="info-row"><span class="info-label">Name</span><span class="info-value">${borrower.name}</span></div>
      <div class="info-row"><span class="info-label">Matric No</span><span class="info-value">${borrower.matric}</span></div>
      <div class="info-row"><span class="info-label">Date</span><span class="info-value">${borrower.date}</span></div>
    </div>`;
} else {
  document.getElementById('borrowerInfo').innerHTML = `
    <div class="info-section">
      <p style="opacity:0.6;">No borrower details found. <a href="../borrower-details/borrower-details.html" style="color:var(--side);">Go back</a></p>
    </div>`;
}

// ── Show books borrowed ──
if (bag.length > 0) {
  fetch('../../farid/data/books.json')
    .then(res => res.json())
    .then(data => {
      const bagBooks = data.filter(book => bag.map(Number).includes(book.id));
      const bookRows = bagBooks.map((book, i) => `
        <div class="info-row">
          <span class="info-label">${i + 1}.</span>
          <span class="info-value">${book.title}</span>
        </div>`).join('');

      document.getElementById('checkoutItems').innerHTML = `
        <div class="info-section">
          <h3 class="section-title">Books Borrowed</h3>
          ${bookRows}
        </div>`;
    })
    .catch(() => {
      document.getElementById('checkoutItems').innerHTML = `
        <div class="info-section">
          <h3 class="section-title">Books Borrowed</h3>
          ${bag.map((id, i) => `<div class="info-row"><span class="info-label">${i+1}.</span><span class="info-value">Book ID: ${id}</span></div>`).join('')}
        </div>`;
    });
} else {
  document.getElementById('checkoutItems').innerHTML = `
    <p>Your bag is empty. <a href="../../farid/catalogue/catalogue.html" style="color:var(--side);">Browse books</a></p>`;
}

// ── Confirm borrow ──
async function confirmBorrow() {
  const bag      = JSON.parse(localStorage.getItem('bag')) || [];
  const borrower = JSON.parse(localStorage.getItem('borrowerDetails'));

  if (bag.length === 0) {
    alert('Your bag is empty!');
    return;
  }
  if (!borrower) {
    alert('Borrower details missing. Please go back and fill in your details.');
    return;
  }

  // Fetch titles for Telegram message
  let bookLines = '';
  try {
    const res      = await fetch('../../farid/data/books.json');
    const data     = await res.json();
    const bagBooks = data.filter(book => bag.map(Number).includes(book.id));
    bookLines      = bagBooks.map((book, i) => `   ${i + 1}. ${book.title}`).join('\n');
  } catch (e) {
    bookLines = bag.map((id, i) => `   ${i + 1}. Book ID: ${id}`).join('\n');
  }

  // Send to Telegram
  const message =
` *New Borrow Request*

 *Name*      : ${borrower.name}
 *Matric No* : ${borrower.matric}
 *Date*      : ${borrower.date}

 *Books Borrowed* :
${bookLines}`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' })
    });
  } catch (e) {
    console.error('Telegram send failed:', e);
  }

  // Clear storage and update UI
  localStorage.removeItem('bag');
  localStorage.removeItem('borrowerDetails');
  document.getElementById('checkoutItems').innerHTML = '';
  document.getElementById('borrowerInfo').innerHTML  = '';
  document.querySelector('.checkout-box > p').innerHTML = '';
  document.querySelector('.confirm-btn').style.display  = 'none';

  const box = document.querySelector('.checkout-box');
  box.innerHTML += `<p style="font-weight:600; font-size:1.1rem; text-align:center; padding: 20px 0;"> Borrowing confirmed! Thank you, ${borrower.name}.</p>`;
}