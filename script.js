// Cart functionality
let cart = [];
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalAmount = document.getElementById('cart-total-amount');
const cartCountElement = document.querySelector('.cart-count');
const cartIcon = document.querySelector('.cart-icon');
const closeCartButton = document.querySelector('.close-cart');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Product data
const products = {
    'Barra de Tofu Clásica': { price: 625.00, calories: 150, protein: '20g' },
    'Barra de Tofu Chocolate': { price: 625.00, calories: 160, protein: '20g' },
    'Barra de Tofu Matcha': { price: 679.00, calories: 150, protein: '20g' }
};

// Add to cart functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        addToCart(productName);
        
        // Add animation to button
        button.textContent = '¡Agregado!';
        button.style.backgroundColor = '#b38a61';
        
        setTimeout(() => {
            button.textContent = 'Agregar al carrito';
            button.style.backgroundColor = '';
        }, 2000);
    });
});

function addToCart(productName) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            quantity: 1,
            price: products[productName].price
        });
    }
    
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-product="${item.name}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-product="${item.name}">+</button>
                </div>
            </div>
            <button class="remove-item" data-product="${item.name}">Eliminar</button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotalAmount.textContent = total.toFixed(2);
}

// Cart modal functionality
cartIcon.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCartButton.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Quantity buttons and remove item functionality
cartItemsContainer.addEventListener('click', (e) => {
    const productName = e.target.dataset.product;
    
    if (e.target.classList.contains('plus')) {
        const item = cart.find(item => item.name === productName);
        if (item) {
            item.quantity += 1;
            updateCartCount();
            updateCartDisplay();
        }
    } else if (e.target.classList.contains('minus')) {
        const item = cart.find(item => item.name === productName);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            updateCartCount();
            updateCartDisplay();
        }
    } else if (e.target.classList.contains('remove-item')) {
        cart = cart.filter(item => item.name !== productName);
        updateCartCount();
        updateCartDisplay();
    }
});

// Checkout button functionality
document.querySelector('.checkout-button').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('¡Tu carrito está vacío!');
        return;
    }
    alert('¡Gracias por tu compra!');
    cart = [];
    updateCartCount();
    updateCartDisplay();
    cartModal.classList.remove('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const announcementBarHeight = document.querySelector('.announcement-bar').offsetHeight;
            const totalOffset = headerHeight + announcementBarHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - totalOffset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    });
}

// Testimonials Carousel
const testimonialsTrack = document.querySelector('.testimonials-track');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.testimonial-card').length;

function updateCarousel() {
    const slideWidth = document.querySelector('.testimonial-card').offsetWidth + 32; // 32 is the gap
    testimonialsTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

if (prevArrow && nextArrow) {
    prevArrow.addEventListener('click', prevSlide);
    nextArrow.addEventListener('click', nextSlide);

    // Auto-advance carousel every 5 seconds
    let autoAdvanceInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    const testimonialsContainer = document.querySelector('.testimonials-container');
    testimonialsContainer.addEventListener('mouseenter', () => {
        clearInterval(autoAdvanceInterval);
    });

    testimonialsContainer.addEventListener('mouseleave', () => {
        autoAdvanceInterval = setInterval(nextSlide, 5000);
    });
} 