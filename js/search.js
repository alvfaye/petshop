const getProductsForSearch = async () => {
  try {
    let results;
    await fetch('./data/products.json') // Adjust the path as necessary
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('products....', data.products);
        return data.products;
      })
      .catch((error) => console.error('Unable to fetch data:', error));
  } catch (err) {
    console.log(err);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  const searchBtn = document.getElementById('search-btn'); // Search icon
  const closeSearchPopup = document.getElementById('close-search-popup'); // Close button
  const searchBox = document.getElementById('search-box'); // Search input field
  const searchResults = document.querySelector('.search-results'); // Search results container
  const searchFormContainer = document.querySelector('.searchF'); // Search form container

  // Open search form when the search icon is clicked
  searchBtn.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior
    searchFormContainer.classList.add('active'); // Show the search form
    searchBox.focus(); // Focus on the search input
  });

  // Close search form when the close button is clicked
  closeSearchPopup.addEventListener('click', function () {
    searchFormContainer.classList.remove('active'); // Hide the search form
    searchResults.innerHTML = ''; // Clear search results
    searchBox.value = ''; // Clear search input
  });

  // Filter products based on search input
  searchBox.addEventListener('input', function () {
    const searchTerm = searchBox.value.toLowerCase();
    console.log(searchTerm);
    searchResults.innerHTML = ''; // Clear previous results

    if (searchTerm) {
      const products = getProductsForSearch(); // Fetch products
      console.log('how many are there in products?????', products);
      const filteredProducts = products.filter((product) => {
        return product.title.toLowerCase().includes(searchTerm);
      });

      if (filteredProducts.length > 0) {
        filteredProducts.forEach((product) => {
          const productClone = document.createElement('div');
          productClone.classList.add('product');
          productClone.innerHTML = `
            <div class="product__header">
              <img src=${product.image} alt="product">
            </div>
            <div class="product__footer">
              <h3>${product.title}</h3>
              <div class="rating">
                <svg>
                  <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                  <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                  <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                  <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                  <use xlink:href="./images/sprite.svg#icon-star-empty"></use>
                </svg>
              </div>
              <div class="product__price">
                <h4>₱${product.price}</h4>
              </div>
              <a href="#"><button type="submit" class="product__btn">Add To Cart</button></a>
            </div>
          `;
          searchResults.appendChild(productClone);
        });
      } else {
        searchResults.innerHTML = '<p>No products found.</p>';
      }
    } else {
      searchResults.innerHTML = ''; // Clear results if search term is empty
    }
  });
});
