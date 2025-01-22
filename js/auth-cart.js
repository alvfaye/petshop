// auth-cart.js

// User Authentication
const users = [
  { email: 'test@email.com', password: 'password123' },
  { email: 'user@email.com', password: 'password456' },
];

function initAuth() {
  const loginForm = document.querySelector('.login-form');
  const loginBtn = document.getElementById('login-btn');
  const authDiv = document.querySelector('.auth');

  const loggedInUser = localStorage.getItem('currentUser');
  if (loggedInUser) {
    loginBtn.innerHTML =
      '<svg><use xlink:href="./images/sprite.svg#icon-user"></use></svg> Logout';
  }

  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (loggedInUser) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('cart');
      cart = [];
      loginBtn.innerHTML =
        '<svg><use xlink:href="./images/sprite.svg#icon-user"></use></svg>';
      alert('Logged out successfully');
      location.reload();
    } else {
      authDiv.classList.toggle('active');
    }
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert('Logged in successfully!');
      authDiv.classList.remove('active');
      loginBtn.innerHTML =
        '<svg><use xlink:href="./images/sprite.svg#icon-user"></use></svg> Logout';
      loginForm.reset();
    } else {
      alert('Invalid credentials!');
    }
  });
}

// Shopping Cart
let cart = [];
let cartContainer;
let cartOverlay;

// Initialize cart elements once
function createCartElements() {
  cartContainer = document.createElement('div');
  cartContainer.className = 'shopping-cart';

  cartOverlay = document.createElement('div');
  cartOverlay.className = 'cart-overlay';

  document.body.appendChild(cartOverlay);
  document.body.appendChild(cartContainer);

  return { cartContainer, cartOverlay };
}

function initCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartBtn = document.getElementById('cart-btn');
  const addToCartBtns = document.querySelectorAll('.product__btn');

  // Create cart elements if they don't exist
  if (!cartContainer || !cartOverlay) {
    ({ cartContainer, cartOverlay } = createCartElements());
  }

  updateCartCount();

  // Efficient event delegation for cart actions
  cartContainer.addEventListener('click', handleCartActions);

  cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCart();
  });

  cartOverlay.addEventListener('click', hideCart);

  // Use event delegation for add to cart buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.product__btn')) {
      e.preventDefault();
      handleAddToCart(e);
    }
  });
}

function handleCartActions(e) {
  const target = e.target;

  if (target.classList.contains('quantity-btn')) {
    const box = target.closest('.box');
    if (!box) return;

    const productId = box.dataset.productId;
    const item = cart.find((item) => item.id === productId);
    if (!item) return;

    if (target.classList.contains('increase')) {
      item.quantity++;
    } else if (target.classList.contains('decrease')) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        // If quantity would go below 1, remove the item instead
        removeFromCart(productId);
        return;
      }
    }

    updateCart();
  } else if (
    target.classList.contains('remove-item') ||
    target.closest('.remove-item')
  ) {
    const box = target.closest('.box');
    if (box) {
      const productId = box.dataset.productId;
      removeWithAnimation(box, productId);
    }
  } else if (target.classList.contains('close-cart')) {
    hideCart();
  }
}

function removeWithAnimation(element, productId) {
  // Add removal animation class
  element.classList.add('removing');

  // Wait for animation to complete
  element.addEventListener('animationend', () => {
    removeFromCart(productId);
  });
}

function handleAddToCart(e) {
  if (!localStorage.getItem('currentUser')) {
    alert('Please login to add items to cart!');
    return;
  }

  const product = e.target.closest('.product');
  if (!product) return;

  const productData = {
    id: Math.random().toString(36).substr(2, 9),
    name: product.querySelector('h3').textContent,
    price: parseFloat(product.querySelector('h4').textContent.replace('₱', '')),
    image: product.querySelector('.product__header img').src,
    quantity: 1,
  };

  addToCart(productData);
}

function toggleCart() {
  if (cartContainer.classList.contains('active')) {
    hideCart();
  } else {
    showCart();
  }
}

function showCart() {
  requestAnimationFrame(() => {
    cartOverlay.style.display = 'block';
    cartContainer.style.display = 'flex';
    renderCart();

    // Force reflow and add active class in next frame
    requestAnimationFrame(() => {
      cartContainer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

function hideCart() {
  cartContainer.classList.remove('active');
  document.body.style.overflow = '';

  setTimeout(() => {
    cartOverlay.style.display = 'none';
    cartContainer.style.display = 'none';
  }, 300);
}

function addToCart(product) {
  const existingItem = cart.find((item) => item.name === product.name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(product);
  }

  updateCart();
  showCart();
}

function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    // Remove the item from the cart array
    cart.splice(index, 1);
    updateCart();

    // If cart is empty after removal, add empty state class
    if (cart.length === 0) {
      cartContainer.classList.add('empty');
      setTimeout(() => {
        renderCart(); // Re-render to show empty cart message
      }, 300); // Wait for animation to complete
    }
  }
}

function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const cartTotal = document.getElementById('cart__total');
  if (cartTotal) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartTotal.textContent = totalItems;

    // Add visual feedback for cart count update
    cartTotal.classList.add('update');
    setTimeout(() => cartTotal.classList.remove('update'), 300);
  }
}

function renderCart() {
  const template = document.createElement('template');

  // Build cart header
  let html = `
    <div class="cart-header">
      <h2>Shopping Cart</h2>
      <button class="close-cart">&times;</button>
    </div>
  `;

  if (cart.length === 0) {
    html += `
      <div class="empty-cart">
        <div class="empty-cart-content">
          <i class="fas fa-shopping-cart"></i>
          <p>Your cart is empty</p>
          <button class="btn continue-shopping" onclick="hideCart()">Continue Shopping</button>
        </div>
      </div>
    `;
    cartContainer.classList.add('empty');
  } else {
    cartContainer.classList.remove('empty');
    // Build cart items
    html += '<div class="cart-items">';
    cart.forEach((item) => {
      html += `
        <div class="box" data-product-id="${item.id}">
          <div class="item-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
          </div>
          <div class="item-details">
            <h3>${item.name}</h3>
            <div class="price-quantity">
              <span class="price">₱${item.price.toFixed(2)}</span>
              <div class="quantity-controls">
                <button class="quantity-btn decrease" aria-label="Decrease quantity">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn increase" aria-label="Increase quantity">+</button>
              </div>
            </div>
            <span class="item-total">Total: ₱${(
              item.price * item.quantity
            ).toFixed(2)}</span>
          </div>
          <button class="remove-item" aria-label="Remove item">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
    });
    html += '</div>';

    // Build cart footer
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    html += `
      <div class="cart-footer">
        <div class="cart-total">
          <span>Total:</span>
          <span class="total-amount">₱${total.toFixed(2)}</span>
        </div>
        <button class="btn checkout-btn" onclick="checkout()">Proceed to Checkout</button>
      </div>
    `;
  }

  template.innerHTML = html;

  // Perform DOM updates in a single operation
  requestAnimationFrame(() => {
    cartContainer.innerHTML = template.innerHTML;
  });
}

function checkout() {
  if (!cart.length) {
    alert('Your cart is empty!');
    return;
  }

  if (confirm('Proceed to checkout?')) {
    cart = [];
    updateCart();
    alert('Thank you for your purchase!');
    hideCart();
  }
}

// Add necessary CSS
const style = document.createElement('style');
style.textContent = `
  .removing {
    animation: removeItem 0.3s ease-out;
    opacity: 0;
    transform: translateX(100%);
  }
  
  @keyframes removeItem {
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(100%);
    }
  }
  
  .cart__total.update {
    animation: updateCount 0.3s ease-out;
  }
  
  @keyframes updateCount {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  
  .shopping-cart .box {
    transition: all 0.3s ease;
  }
  
  .shopping-cart.empty .empty-cart {
    animation: fadeIn 0.3s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .item-total {
    display: block;
    margin-top: 0.5rem;
    font-weight: bold;
    color: #666;
  }
`;
document.head.appendChild(style);

// Make necessary functions globally available
window.hideCart = hideCart;
window.checkout = checkout;

// Initialize both features
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initCart();
});
