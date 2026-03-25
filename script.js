let cart = JSON.parse(localStorage.getItem("cart")) || [];
const deliveryCharge = 40;

// ITEM WITH QUANTITY
function addToCart(name, price) {

  price = Number(price);

  //   item already exists
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

function loadCart() {
  const cartItems = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");

  if (!cartItems) return;

  cartItems.innerHTML = "";
  let subtotal = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Your cart is empty</li>";
  } else {

    cart.forEach(item => {

      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const li = document.createElement("li");
      li.textContent =
        item.name +
        " (x" + item.quantity + ") - ₹" +
        itemTotal;

      cartItems.appendChild(li);
    });
  }

  subtotalEl.textContent = subtotal;
  updateTotal();
}

//  TOTAL
function updateTotal() {
  const subtotal =
    Number(document.getElementById("subtotal").textContent) || 0;

  const tip =
    Number(document.getElementById("tip").value) || 0;

  const total = subtotal + deliveryCharge + tip;

  document.getElementById("total").textContent = total;
}


function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  loadCart();
}
