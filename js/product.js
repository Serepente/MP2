import {
    products
} from './products.js';
let showItems = document.getElementById("show-items");
let cartItems = [];
let totalPrice = localStorage.getItem("totalPrice");
let showModal = document.getElementById("show-modal");

let total = document.getElementById("total-price");
total.innerHTML = `${totalPrice}`;

// Function to add a product to the cart
function addToCart(product, addToCartBtn) {
    let productIndex = products.indexOf(product);

    if (productIndex !== -1) {
        cartItems.push(products[productIndex]);
        updateCartContent(cartItems);
        saveCartToLocalStorage();

        addToCartBtn.textContent = "Added to Cart";
        addToCartBtn.disabled = true;
    }
}

window.onload = () => {
    // Retrieve cart items from localStorage
    let savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
        cartItems = JSON.parse(savedCartItems);
        updateCartContent(cartItems);
        // updateTotalPrice(cartItems);
    }
    // Add to cart buttons
    let addToCartButtons = document.querySelectorAll(".add-cart");
    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            addToCart(products[index], button);
        });
    });
};
// sHOW ITEMS
products.forEach((product)=>{
    let createElement = document.createElement("div");
    createElement.classList.add("col-md-3");
    createElement.innerHTML = `
    <div class="card custom-card mb-3" style="width: 18rem;">
                        <img src="${product.ProductImage}" class="card-img-top" alt="${product.productName}">
                        <div class="card-body custom-card-body">
                            <h4 class="card-title">${product.productName}</h4>
                            <div class="position-absolute bottom-0 start-50 translate-middle-x">
                                <button class="btn btn-warning modal-btn mb-2" type="button" data-bs-toggle="modal" data-bs-target="#${product.ModalId}" >More Info</button>
                                <button class="btn btn-primary add-cart mb-2"> Add to Cart <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i>
                                </button> 
                            </div>
                        </div>
                    </div>
    `;
    showItems.appendChild(createElement);

});

// Show Modal
products.forEach((product) => {
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


// Update cart content
function updateCartContent(cartItems) {
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
// Save to local storage
function saveCartToLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }




