import {
    items
} from './products.js';

window.onload = () => {
    let savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      cartItems = JSON.parse(savedCartItems);
      // updateCartCount();
      updateCartContent();
    }
  };

// Showing the top products
let showItems = document.getElementById("show-top-products");
let showModal = document.getElementById("show-modal");
let cartItems = [];
// let addToCart = document.getElementById("add-cart");

items.forEach((product) => {
    let createElement = document.createElement("div");
    createElement.classList.add("card", "swiper-slide", "text-center", "custom-card");
    createElement.innerHTML = `
    <img src="${product.ProductImage}" class="card-img-top p-3" alt="${product.productName}">
    <div class="card-body">
    <h5 class="card-title mb-5">${product.productName}</h5>
    <div class="text-body-secondary">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam accusamus rem odit et explicabo aliquid.
    </div>
    <p class="card-text"><i class="fa-solid fa-peso-sign" style="color: #000000;"></i> ${product.productPrice}</p>
    <button class="btn btn-warning modal-btn" type="button" data-bs-toggle="modal" data-bs-target="#${product.ModalId}" >More Info</button>
    <button class="btn btn-primary add-cart"> Add to Cart <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i></button> 
  </div>
  `;

    showItems.appendChild(createElement);

    initSwiper();

    // To add cart
    let addToCartBtn = createElement.querySelector(".add-cart");
    addToCartBtn.addEventListener("click", () => {
        addToCart(product, addToCartBtn);
    });
});

// Add to cart function
 function addToCart(product, addToCartBtn) {
    let productIndex = items.indexOf(product);

    if (productIndex !== -1) {
        cartItems.push(items[productIndex]);
        // updateCartCount();
        updateCartContent();
        saveCartToLocalStorage();
  
        addToCartBtn.textContent = "Added to Cart";
        addToCartBtn.disabled = true;
      }
};


// Update cart content
function updateCartContent() {
    let cartContent = document.getElementById("cart-content");
    cartContent.innerHTML = ""; 
  
    cartItems.forEach((product) => {
      let cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item", "row"); 
      cartItemElement.innerHTML = `
      <div class="col-md-4 mb-4">
      <img src="${product.ProductImage}" alt="" class="popover-image">
    </div>
    <div class="col-md-4 mt-3">
      <h5 class="cart-item-title">${product.productName}</h5>
    </div>
    <div class="col-md-4 text-center">
      <p class="cart-item-price py-3"><i class="fa-solid fa-peso-sign" style="color: #FAF3F0;"></i> ${product.productPrice}</p>
        </div>
      `;
      cartContent.appendChild(cartItemElement);
    });
    updateTotalPrice();
}

// Total price function
function updateTotalPrice(){
    let totalAmount= document.getElementById("total-price");
    let totalPrice = calculateTotal();
    totalAmount.textContent = totalPrice;

    localStorage.setItem("totalPrice", totalPrice);
}
function calculateTotal(){
    let total = 0;
    cartItems.forEach((product)=>{
      total += parseFloat(product.productPrice);
    });
    return total;
}
function clearCart() {
    cartItems = []; 
    // updateCartCount();
    // addToCartBtn.textContent = "Add to Cart";
    // addToCartBtn.disabled = false;
    updateCartContent();
    saveCartToLocalStorage(); 
}

    // let clearCartButton = document.getElementById("clear-cart-button");
    // clearCartButton.addEventListener("click", clearCart);
    // clearCart();


//Save cart
function saveCartToLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

// Show Modal
items.forEach((product) => {
    let createElement = document.createElement("div");
    createElement.classList.add("modals", "text-end");
    createElement.innerHTML = `
    <div class="modal fade" id="${product.ModalId}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-uppercase" id="ModalLabel">${product.productName}</h5>
                <button type="button" class="btn-close closeBtn" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <img src="${product.ProductImage}" alt="Image" class="img-fluid">
                    </div>
                    <div class="col-md-6">
                        <p>${product.productDescription}</p><br>
                            <hr>
                            Recipes
                            <hr>
                            Recipes<br>
                            <hr>
                            <h3>Price: <i class="fa-solid fa-peso-sign" style="color: #000000;"></i>${product.productPrice}</h3>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
            <button class="btn btn-primary add-cart">Add to Cart <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i></button> 
            </div>
        </div>
    </div>
</div>
    `;

    showModal.appendChild(createElement);

    // To add cart
    let addToCartBtn = createElement.querySelector(".add-cart");
    addToCartBtn.addEventListener("click", () => {
        addToCart(product, addToCartBtn);
    });
});




// Initializing slider
function initSwiper() {
    const swiper = new Swiper(".slide-container", {
        slidesPerView: 1,
        spaceBetween: 30,
        grabCursor: true,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            520: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1000: {
                slidesPerView: 4,
            },
        },
    });
}