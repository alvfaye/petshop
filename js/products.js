const getProducts = async () => {
  try {
    const response = await fetch('./data/products.json');
    const data = await response.json();
    const products = data.products;
    return products;
  } catch (err) {
    console.log(err);
  }
};

/*
=============
Load Category Products
=============
 */
const categoryCenter = document.querySelector('.category__center');

window.addEventListener('DOMContentLoaded', async function () {
  // initAuth();
  const products = await getProducts();
  displayProductItems(products);
});

const displayProductItems = (items) => {
  let displayProduct = items.map(
    (product) => ` 
                  <div class="product category__products">
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

                  </div>
                  `
  );

  displayProduct = displayProduct.join('');
  if (categoryCenter) {
    categoryCenter.innerHTML = displayProduct;
  }
};

/*
=============
Filtering
=============
 */

const filterBtn = document.querySelectorAll('.filter-btn');
const categoryContainer = document.getElementById('category');

if (categoryContainer) {
  categoryContainer.addEventListener('click', async (e) => {
    const target = e.target.closest('.section__title');
    if (!target) return;

    const id = target.dataset.id;
    const products = await getProducts();

    if (id) {
      // remove active from buttons
      Array.from(filterBtn).forEach((btn) => {
        btn.classList.remove('active');
      });
      target.classList.add('active');

      // Load Products
      let menuCategory = products.filter((product) => {
        if (product.category === id) {
          return product;
        }
      });

      if (id === 'All Products') {
        displayProductItems(products);
      } else {
        displayProductItems(menuCategory);
      }
    }
  });
}

/** 
================================
Filter According to Search Term
================================
*/
const searchContainer = document.getElementById('searchC');

if (searchContainer) {
  searchContainer.addEventListener('click', (e) => {
    const products = getProducts();
    const searchTerm = 'whiskas';

    getProducts()
      .then((products) => {
        function filterProducts(searchTerm) {
          return products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
      })
      .catch((error) => console.log(error));

    let foundItems = filterProducts(searchTerm);

    displayProductItems(foundItems);
  });
} else {
  console.log('searchContainer not found!');
}

/*
=============
Product Details Left
=============
 */
const pic1 = document.getElementById('pic1');
const pic2 = document.getElementById('pic2');
const pic3 = document.getElementById('pic3');
const pic4 = document.getElementById('pic4');
const pic5 = document.getElementById('pic5');
const picContainer = document.querySelector('.product__pictures');
const zoom = document.getElementById('zoom');
const pic = document.getElementById('pic');

// Picture List
const picList = [pic1, pic2, pic3, pic4, pic5];

// Active Picture
let picActive = 1;

['mouseover', 'touchstart'].forEach((event) => {
  if (picContainer) {
    picContainer.addEventListener(event, (e) => {
      const target = e.target.closest('img');
      if (!target) return;
      const id = target.id.slice(3);
      // changeImage(`./images/products/iPhone/iphone${id}.jpeg`, id);

      changeImage(`./img/dogfoods/dog product (${id}).jpg`, id);
    });
  }
});

// change active image
const changeImage = (imgSrc, n) => {
  // change the main image
  pic.src = imgSrc;
  // change the background-image
  zoom.style.backgroundImage = `url(${imgSrc})`;
  //   remove the border from the previous active side image
  picList[picActive - 1].classList.remove('img-active');
  // add to the active image
  picList[n - 1].classList.add('img-active');
  //   update the active side picture
  picActive = n;
};

/*
=============
Product Details Bottom
=============
 */

const btns = document.querySelectorAll('.detail-btn');
const detail = document.querySelector('.product-detail__bottom');
const contents = document.querySelectorAll('.content');

if (detail) {
  detail.addEventListener('click', (e) => {
    const target = e.target.closest('.detail-btn');
    if (!target) return;

    const id = target.dataset.id;
    if (id) {
      Array.from(btns).forEach((btn) => {
        // remove active from all btn
        btn.classList.remove('active');
        e.target.closest('.detail-btn').classList.add('active');
      });
      // hide other active
      Array.from(contents).forEach((content) => {
        content.classList.remove('active');
      });
      const element = document.getElementById(id);
      element.classList.add('active');
    }
  });
}
