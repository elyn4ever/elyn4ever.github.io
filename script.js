document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 10, description: 'Description for Product 1', image: '1.jpg' },
        { id: 2, name: 'Product 2', price: 20, description: 'Description for Product 2', image: '2.jpg' },
        { id: 3, name: 'Product 3', price: 30, description: 'Description for Product 3', image: '3.jpg' },
        { id: 4, name: 'Product 4', price: 40, description: 'Description for Product 4', image: '4.jpg' },
        { id: 5, name: 'Product 5', price: 50, description: 'Description for Product 5', image: '5.jpg' },
        { id: 6, name: 'Product 6', price: 60, description: 'Description for Product 6', image: '6.jpg' },

    ];
    const cart = [];

    const productsElement = document.getElementById('products');
    const cartElement = document.getElementById('cart');

    function updateCart() {
        cartElement.innerHTML = '';
        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.textContent = `${item.name} - Quantity: ${item.quantity} - Price per item: $${item.price}`;
            // Add and Remove buttons
            const addButton = document.createElement('button');
            addButton.textContent = '+';
            addButton.onclick = () => {
                item.quantity += 1;
                updateCart();
            };
            const removeButton = document.createElement('button');
            removeButton.textContent = '-';
            removeButton.onclick = () => {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    const index = cart.indexOf(item);
                    cart.splice(index, 1);
                }
                updateCart();
            };
            itemElement.appendChild(addButton);
            itemElement.appendChild(removeButton);
            cartElement.appendChild(itemElement);
        });
        const totalPriceElement = document.createElement('div');
        totalPriceElement.textContent = `Total Price: $${totalPrice}`;
        cartElement.appendChild(totalPriceElement);
    }

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        
        // Product Image
        const imgElement = document.createElement('img');
        imgElement.src = product.image;
        imgElement.alt = `Image of ${product.name}`;
        imgElement.style.width = '100px'; // Adjust image size as needed
        productElement.appendChild(imgElement);
        
        // Product Name and Price
        const nameElement = document.createElement('h4');
        nameElement.textContent = `${product.name} - $${product.price}`;
        productElement.appendChild(nameElement);
        
        // Product Description
        const descElement = document.createElement('p');
        descElement.textContent = product.description;
        productElement.appendChild(descElement);

        // Add to Cart Button
        const button = document.createElement('button');
        button.textContent = 'Add to Cart';
        button.classList.add('button');
        button.onclick = () => {
            const found = cart.find(item => item.id === product.id);
            if (found) {
                found.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();
        };
        productElement.appendChild(button);
        productsElement.appendChild(productElement);
    });

    updateCart();
});
