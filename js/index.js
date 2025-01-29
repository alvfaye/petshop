/*
=============
Navigation
=============
 */
const navOpen = document.querySelector('.nav__hamburger');
const navClose = document.querySelector('.close__toggle');
const menu = document.querySelector('.nav__menu');
const scrollLink = document.querySelectorAll('.scroll-link');
const navContainer = document.querySelector('.nav__menu');

navOpen.addEventListener('click', () => {
  menu.classList.add('open');
  document.body.classList.add('active');
  navContainer.style.left = '0';
  navContainer.style.width = '30rem';
});

navClose.addEventListener('click', () => {
  menu.classList.remove('open');
  document.body.classList.remove('active');
  navContainer.style.left = '-30rem';
  navContainer.style.width = '0';
});

/*
=============
PopUp
=============
 */
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close');

if (popup) {
  closePopup.addEventListener('click', () => {
    popup.classList.add('hide__popup');
  });

  window.addEventListener('load', () => {
    setTimeout(() => {
      popup.classList.remove('hide__popup');
    }, 500);
  });

}
window.onclick = function (event) {
  if (event.target == popup) {
    popup.style.display = 'none';
  }
};

// /*
// =============
// PopUp
// =============
//  */
// const popup = document.querySelector('.popup');
// const closePopup = document.querySelector('.popup__close');
// const data = getWithExpiry('popupShown');

// if (!data) {
//   if (popup) {
//     closePopup.addEventListener('click', () => {
//       popup.classList.add('hide__popup');
//     });

//     window.addEventListener('load', () => {
//       setTimeout(() => {
//         popup.classList.remove('hide__popup');
//       }, 500);
//     });
//   }

//   setWithExpiry('popupShown', 'true', 1000); // 2 * 60 * 60 * 1000 ----- 2 hours in milliseconds
// }

// function setWithExpiry(key, value, ttl) {
//   const now = new Date();
//   const item = {
//     value: value,
//     expiry: now.getTime() + ttl, // Set the expiry time
//   };
//   localStorage.setItem(key, JSON.stringify(item));
// }

// function getWithExpiry(key) {
//   const itemStr = localStorage.getItem(key);

//   // If the item doesn't exist, return null
//   if (!itemStr) {
//     return null;
//   }

//   const item = JSON.parse(itemStr);
//   const now = new Date();

//   // Check if the current time is greater than the expiry time
//   if (now.getTime() > item.expiry) {
//     // If expired, remove the item from storage
//     localStorage.removeItem(key);
//     return null;
//   }

//   return item.value; // Return the stored value if not expired
// }

// const popup = document.querySelector(".popup");

// const closePopup = popup.querySelector('.popup__close');

//   if (popup) {
//     // Close the popup on button click

//     const isPopupShown = '';
//     // Check if the popup has been shown before
//     const data = getWithExpiry('popupShown');
//     if (data) {
//       isPopupShown = 'true'; //localStorage.getItem('popupShown');
//       // console.log('Data:', data); // Data will be available if not expired
//     } else {

//        closePopup.addEventListener('click', () => {
//          popup.classList.add('hide__popup');
//          popup.setAttribute('aria-hidden', 'true');
//        });

//       isPopupShown = '';
//       // console.log('Data has expired or does not exist.');
//     }

//     //const isPopupShown = localStorage.getItem('popupShown');

//     if (!isPopupShown) {
//       // Show the popup only on initial load
//       window.addEventListener('load', () => {
//         setTimeout(() => {
//           popup.classList.remove('hide__popup');
//           popup.setAttribute('aria-hidden', 'false');

//           // Mark the popup as shown in localStorage
// // 2 * 60 * 60 * 1000
//           setWithExpiry('popupShown', 'true',  1000); // 2 hours in milliseconds

//           //localStorage.setItem('popupShown', 'true');
//         }, 500);
//       });
//     }

//     // Close the popup on Esc key press
//     // document.addEventListener('keydown', (e) => {
//     //   if (e.key === 'Escape') {
//     //     popup.classList.add('hide__popup');
//     //     popup.setAttribute('aria-hidden', 'true');
//     //   }
//     // });
//   }
// // });

/*
=============
Fixed Navigation
=============
 */

const navBar = document.querySelector('.navigation');
const gotoTop = document.querySelector('.goto-top');

// Smooth Scroll
Array.from(scrollLink).map((link) => {
  link.addEventListener('click', (e) => {
    // Prevent Default
    e.preventDefault();

    const id = e.currentTarget.getAttribute('href').slice(1);
    const element = document.getElementById(id);
    const navHeight = navBar.getBoundingClientRect().height;
    const fixNav = navBar.classList.contains('fix__nav');
    let position = element.offsetTop - navHeight;

    if (!fixNav) {
      position = position - navHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    navContainer.style.left = '-30rem';
    document.body.classList.remove('active');
  });
});

// Fix NavBar

window.addEventListener('scroll', (e) => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navBar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navBar.classList.add('fix__nav');
  } else {
    navBar.classList.remove('fix__nav');
  }

  if (scrollHeight > 300) {
    gotoTop.classList.add('show-top');
  } else {
    gotoTop.classList.remove('show-top');
  }
});

let login = document.querySelector('.login-form');
let shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#login-btn').onclick = () => {
  login.classList.toggle('active');
  searchForm.classList.remove('active');
  shoppingCart ? shoppingCart.classList.remove('active') : null;
};

document.querySelector('#cart-btn').onclick = () => {
  shoppingCart ? shoppingCart.classList.toggle('active') : null;
  searchForm.classList.remove('active');
  login.classList.remove('active');
};

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
  shoppingCart ? shoppingCart.classList.remove('active') : null;
  login.classList.remove('active');
  // console.log('searchForm');
};
