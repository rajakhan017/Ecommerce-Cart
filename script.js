const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
 ];
 const productListView = document.getElementById("product-list");
 const shoppingCartListView = document.getElementById("shopping-cart-list");
 const cartStatus = document.getElementById("cart-status");
 const totalPriceDisplay = document.getElementById("total-price");
 const cart = [];
 function renderProductList() {
    productListView.innerHTML = '';
    Products.forEach((product) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${product.name} - $${product.price} <button onclick="removeFromCart(${product.id})">-</button> <span id="count${product.id}">0</span> <button onclick="addToCart(${product.id})">+</button>` ;
        productListView.appendChild(listItem);
    });
 }
 function renderShoppingCart() {
    shoppingCartListView.innerHTML = '';

    for (let i = 1; i <= 3; i++) {
        document.getElementById(`count${i}`).innerText = 0
    }

    let total = 0;
    cart.forEach((cartItem) => {
        const listItem = document.createElement("li");
        const itemPrice = cartItem.product.price * cartItem.quantity;
        total += itemPrice;
        listItem.innerHTML = `${cartItem.product.name} - $${cartItem.product.price} x ${cartItem.quantity} = $${itemPrice} <button onclick="removeFromCart(${cartItem.product.id})">-</button>`;
        const count = document.getElementById(`count${cartItem.product.id}`);
        count.innerText = cartItem.quantity
        shoppingCartListView.appendChild(listItem);
    });
    if (cart.length > 0) {
        cartStatus.style.display = "none";
    } else {
        cartStatus.style.display = "block";
    }
    totalPriceDisplay.textContent = `Total Price: $${total}`;
 }
 function addToCart(productId) {
    const product = Products.find((p) => p.id === productId);
    if (product) {
        const existingItem = cart.find((item) => item.product.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ product, quantity: 1 });
        }
        renderShoppingCart();
    }
 }
 function removeFromCart(productId) {
    const existingItemIndex = cart.findIndex((item) => item.product.id === productId);
    if (existingItemIndex !== -1) {
        if (cart[existingItemIndex].quantity > 1) {
            cart[existingItemIndex].quantity -= 1;
        } else {
            cart.splice(existingItemIndex, 1);
        }
        renderShoppingCart();
    }
 }
 
 document.addEventListener("DOMContentLoaded", () => {
    renderProductList();
    renderShoppingCart();
 });
 