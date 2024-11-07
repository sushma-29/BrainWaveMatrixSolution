let cartCount = 0;
let cartItems = [];
let totalPrice = 0.00;

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const product = event.target.closest('.product');
        const productName = product.getAttribute('data-name');
        const productPrice = parseFloat(product.getAttribute('data-price'));
        const quantity = parseInt(product.querySelector('.quantity').value);
        const productCategory = product.getAttribute('data-category');
        
        cartCount += quantity;
        cartItems.push({ name: productName, price: productPrice, quantity: quantity, category: productCategory });
        totalPrice += productPrice * quantity;
        
        document.getElementById('cart-count').innerText = cartCount;
        document.getElementById('total-price').innerText = totalPrice.toFixed(2);
        updateCartModal();
    });
});

document.getElementById('category-filter').addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        if (selectedCategory === 'all' || product.getAttribute('data-category') === selectedCategory) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

document.getElementById('search-bar').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

document.getElementById('cart-button').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
});

function updateCartModal() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';
 cartItems.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity}`;
        cartItemsList.appendChild(cartItem);
    });
}