// search.js

document.addEventListener('DOMContentLoaded', function () {
  const searchBox = document.getElementById('search-box');
  const searchResults = document.querySelector('.search-results');
  const searchForm = document.querySelector('.searchF');
  const closeSearchPopup = document.getElementById('close-search-popup');
  //const searchBtn = document.getElementById('search-btn');
  const searchBtn = document.getElementById('searchC');

  // Sample product data (replace with your actual product data)
  const products = [
    {
      name: 'Whiskas Tuna Dry Food',
      category: 'Cat Food',
      price: '₱350',
      image: '/images/products/pets/foods/cats/product1.jpg',
    },
    {
      name: 'Nutrical Calcium Supplement in Syrup',
      category: 'Supplement',
      price: '₱149',
      image: '/images/products/pets/supplements/product5.jpg',
    },
    {
      name: 'Goodest Braised Beef with Veggies Wet Dog Food',
      category: 'Dog Food',
      price: '₱40',
      image: '/images/products/pets/foods/dogs/product12.jpg',
    },
    {
      name: 'Gray Elephant Dog Toy',
      category: 'Toy',
      price: '₱270',
      image: '/images/products/pets/toys/product2.jpg',
    },
    {
      name: 'Refine Salmon Canned Wet Food',
      category: 'Cat Food',
      price: '₱70',
      image: './images/products/pets/foods/cats/product7.jpg',
    },
    {
      name: 'Paleo Pet Beef Flavor Wet Dog Food',
      category: 'Dog Food',
      price: '₱265',
      image: 'images/products/pets/foods/dogs/product3.png',
    },
    {
      name: 'Pink Fox Dog Toy',
      category: 'Toy',
      price: '₱329',
      image: 'images/products/pets/toys/product6.png',
    },
    {
      name: 'Whiskas Ocean Fish Wet Food',
      category: 'Cat Food',
      price: '₱75',
      image: 'images/products/pets/foods/cats/product4.jpg',
    },
    {
      name: 'Pedigree Puppy Chicken Wet Dog Food',
      category: 'Dog Food',
      price: '₱45',
      image: 'images/products/pets/foods/dogs/product10.png',
    },
  ];

  // Function to filter products based on search term
  function filterProducts(searchTerm) {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Function to display search results
  function displayResults(results) {
    searchResults.innerHTML = '';
    if (results.length > 0) {
      results.forEach((product) => {
        const resultItem = document.createElement('div');
        resultItem.innerHTML = `
          <img src="${product.image}" alt="${product.name}" width="50">
          <span>${product.name} - ${product.price}</span>
        `;
        resultItem.addEventListener('click', () => {
          // Redirect to product page or perform other actions
          alert(`You clicked on ${product.name}`);
        });
        searchResults.appendChild(resultItem);
      });
    } else {
      searchResults.innerHTML = '<div>No products found</div>';
    }
  }

  // Event listener for search input
  searchBox.addEventListener('input', function () {
    const searchTerm = searchBox.value.trim();
    if (searchTerm.length > 0) {
      const results = filterProducts(searchTerm);
      console.log("results filtered products.........",results)
      displayResults(results);
    } else {
      searchResults.innerHTML = '';
    }
  });

  // Show search form when search button is clicked
  searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    searchForm.style.display = 'flex';
    console.log('inside event listener for searchBtn....')
  });

  // Close search form when close button is clicked
  closeSearchPopup.addEventListener('click', function () {
    searchForm.style.display = 'none';
    searchBox.value = '';
    searchResults.innerHTML = '';
  });

  // Close search form when clicking outside of it
  window.addEventListener('click', function (e) {
    if (e.target === searchForm) {
      searchForm.style.display = 'none';
      searchBox.value = '';
      searchResults.innerHTML = '';
    }
  });
});
