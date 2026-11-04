// our data: named objects, setting prices.
const products = {
  kopi: { name: 'Kopi', price: 6 },
  teh: { name: 'Teh', price: 4 },
  nasilemak: {name: 'Nasi Lemal', price: 10}
};

// DOM references: these point to elements, they are NOT copies of their current values of the elements!
const form = document.querySelector('#order-form');
const productInput = document.querySelector('#product');
const quantityInput = document.querySelector('#quantity');
const message = document.querySelector('#message');
const summary = document.querySelector('#summary');
const resetButton = document.querySelector('#reset-estimate');

// State: the last accepted estimate. No browser storage or server session is used.
let estimate = null;

function total(price, quantity) {
  return price * quantity;
}

// calculation example for the first demonstration: total(6, 3) is 18.
function render() {
  if (estimate === null) {
    summary.textContent = 'No estimate yet.';
    return;
  }
  summary.textContent = estimate.name + ' x ' + estimate.quantity
    + ' = RM' + estimate.amount;
}

function handleSubmit(event) {
  event.preventDefault(); // Keep this page open instead of default form navigation by the browser (refresh or whatever)
  const productId = productInput.value;
  const raw = quantityInput.value.trim();

  // we have exactly three accepted product IDs.
  if (productId !== 'kopi' && productId !== 'teh' && productId !== 'nasilemak') {
message.classList.remove('success');
message.classList.add('error');
    message.textContent = 'Choose a listed product. The last valid estimate is unchanged.';
    return;
  }
  if (raw === '') {
message.classList.remove('success');
message.classList.add('error');

    message.textContent = 'Enter a quantity. The last valid estimate is unchanged.';
    return;
  }

  const quantity = Number(raw);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 5) {

message.classList.remove('success');
message.classList.add('error');

    message.textContent = 'Use a whole number from 1 to 5. The last valid estimate is unchanged.';
    return;
  }

  // Update state only after both inputs pass their checks.
  const product = products[productId];
  estimate = { name: product.name, quantity: quantity,
    amount: total(product.price, quantity) };
  render();
message.classList.remove('error');
message.classList.add('success');

  message.textContent = 'Estimate updated. No order has been placed.';
}

function resetEstimate() {
  form.reset();
  estimate = null;
  render();
  message.textContent = 'Choose a product and enter a quantity.';
message.classList.remove('error', 'success');
  productInput.focus();
}

form.addEventListener('submit', handleSubmit);
resetButton.addEventListener('click', resetEstimate);
render();
