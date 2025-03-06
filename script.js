let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
}
// Dark Mode
let darkmode = document.querySelector('#darkmode');

darkmode.onclick = () => {
    if(darkmode.classList.contains('bx-moon')){
        darkmode.classList.replace('bx-moon','bx-sun');
        document.body.classList.add('active');
    }else{
        darkmode.classList.replace('bx-sun','bx-moon');
        document.body.classList.remove('active');
    }
}

// Scroll Reveal
const sr = ScrollReveal ({
    origin: 'top',
    distance: '40px',
    duration: 2000,
    reset: false
});


sr.reveal(`.home-text, .home-img,
            .about-img, .about-text,
            .box, .s-box,
            .btn, .connect-text,
            .contact-box`, {
    interval: 200
})

// Buy button functionality
document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const box = btn.closest('.box');
        const orderData = {
            name: box.querySelector('h2').textContent,
            description: box.querySelector('h3').textContent,
            price: box.querySelector('span').textContent,
            timestamp: new Date().toISOString()
        };
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        alert('Item added to orders!');
    });
});

// Function to display ordered items
function displayOrders() {
    const ordersList = document.getElementById('ordersList');
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (orders.length === 0) {
        ordersList.innerHTML = '<p>No orders yet.</p>';
        return;
    }
    ordersList.innerHTML = orders.map(order => (
        `<div class="order-item">
            <p><strong>${order.name}</strong> (${order.price})</p>
            <p>${order.description}</p>
            <small>Ordered on: ${new Date(order.timestamp).toLocaleString()}</small>
        </div>`
    )).join('');
}

// Event listener for the Ordered Items link
document.getElementById('orderedItemsLink').addEventListener('click', function(e) {
    e.preventDefault();
    const orderedSection = document.querySelector('.ordered-items');
    orderedSection.style.display = 'block';
    displayOrders();
    orderedSection.scrollIntoView({ behavior: 'smooth' });
});