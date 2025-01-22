// Get DOM elements
const searchForm = document.querySelector('.search-form');
const searchBox = document.getElementById('search-box');
const searchResults = document.querySelector('.search-results');
const searchBtn = document.getElementById('search-btn');
const searchClose = document.querySelector('.search-close');

// Show search form when search icon is clicked
searchBtn.addEventListener('click', () => {
  document.querySelector('.searchF').classList.add('active');
  searchBox.focus();
});

// Hide search form when close button is clicked
searchClose.addEventListener('click', () => {
  document.querySelector('.searchF').classList.remove('active');
  searchBox.value = '';
  searchResults.innerHTML = '';
});

// Function to filter products based on search term
function filterProducts(searchTerm) {
  return products.filter((product) => {
    const productName = product.name.toLowerCase();
    const productCategory = product.category.toLowerCase();
    const searchLower = searchTerm.toLowerCase();

    return (
      productName.includes(searchLower) || productCategory.includes(searchLower)
    );
  });
}

// Function to display search results
function displaySearchResults(results) {
  searchResults.innerHTML = '';

  if (results.length === 0) {
    searchResults.innerHTML = '<div class="no-results">No products found</div>';
    return;
  }

  const resultsHtml = results
    .map(
      (product) => `
        <div class="search-result-item">
            <img src="${product.image}" alt="${product.name}">
            <div class="search-result-details">
                <h4>${product.name}</h4>
                <p class="price">₱${product.price}</p>
            </div>
        </div>
    `
    )
    .join('');

  searchResults.innerHTML = resultsHtml;
}

// Handle search input
searchBox.addEventListener('input', (e) => {
  const searchTerm = e.target.value.trim();

  if (searchTerm.length < 2) {
    searchResults.innerHTML = '';
    return;
  }

  const filteredProducts = filterProducts(searchTerm);
  displaySearchResults(filteredProducts);
});

// Handle clicking on search result items
searchResults.addEventListener('click', (e) => {
  const resultItem = e.target.closest('.search-result-item');
  if (resultItem) {
    // You can add functionality here to navigate to the product page
    // or add the product to the cart
    console.log('Product clicked:', resultItem.querySelector('h4').textContent);
  }
});
