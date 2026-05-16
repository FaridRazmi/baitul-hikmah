feather.replace();

// ── Name: letters and spaces only ──
document.getElementById('borrowerName').addEventListener('input', function () {
  this.value = this.value.replace(/[^A-Za-z\s]/g, '');
});

// ── Matric No: max 6 digits ──
document.getElementById('matricNo').addEventListener('input', function () {
  if (this.value.length > 6) this.value = this.value.slice(0, 6);
});

// ── Date: auto-format as DD/MM/YY ──
document.getElementById('borrowDate').addEventListener('input', function () {
  let raw = this.value.replace(/\D/g, '').slice(0, 6);
  let formatted = '';
  if (raw.length <= 2) {
    formatted = raw;
  } else if (raw.length <= 4) {
    formatted = raw.slice(0, 2) + '/' + raw.slice(2);
  } else {
    formatted = raw.slice(0, 2) + '/' + raw.slice(2, 4) + '/' + raw.slice(4);
  }
  this.value = formatted;
});

// ── Proceed to checkout ──
function proceedToCheckout() {
  const name   = document.getElementById('borrowerName').value.trim();
  const matric = document.getElementById('matricNo').value.trim();
  const date   = document.getElementById('borrowDate').value.trim();

  if (!name) {
    alert('Please enter your full name.');
    document.getElementById('borrowerName').focus();
    return;
  }
  if (matric.length !== 6) {
    alert('Matric number must be exactly 6 digits.');
    document.getElementById('matricNo').focus();
    return;
  }
  if (!/^\d{2}\/\d{2}\/\d{2}$/.test(date)) {
    alert('Please enter the date in DD/MM/YY format.');
    document.getElementById('borrowDate').focus();
    return;
  }

  // Save to localStorage so checkout page can read it
  localStorage.setItem('borrowerDetails', JSON.stringify({ name, matric, date }));

  // Navigate to checkout
  window.location.href = '../checkout/checkout.html';
}

