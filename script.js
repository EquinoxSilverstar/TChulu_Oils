// Slideshow functionality
let slideIndexes = [0, 0, 0]; // Track slide indices for each slideshow

function showSlide(slideshowClass, slideshowIndex) {
    const slides = document.getElementsByClassName(slideshowClass);
    if (slideIndexes[slideshowIndex] >= slides.length) slideIndexes[slideshowIndex] = 0;
    if (slideIndexes[slideshowIndex] < 0) slideIndexes[slideshowIndex] = slides.length - 1;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndexes[slideshowIndex]].style.display = "block";
}

function changeSlide(step, slideshowClass, slideshowIndex) {
    slideIndexes[slideshowIndex] += step;
    showSlide(slideshowClass, slideshowIndex);
}

// Modal functionality
function zoomImage(event) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('zoomedImage');
    const caption = document.getElementById('caption');

    modal.style.display = "block";
    modalImg.src = event.target.src;
    caption.innerText = event.target.alt || "Tchulu Oils Review";
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = "none";
}

// Attach click event for zoom functionality
function enableZoom() {
    const images = document.querySelectorAll('.image');
    images.forEach(img => img.addEventListener('click', zoomImage));
}

// Initialize slides and zoom
function initializeSlideshows() {
    showSlide('mySlides1', 0);
    showSlide('mySlides2', 1);
    showSlide('mySlides3', 2);
    enableZoom();
}

initializeSlideshows();


let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;

            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}


const initApp = () => {
    // Fetch product data
    fetch('products.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load products.json');
            return response.json();
        })
        .then(data => {
            products = data;
            addDataToHTML();

            // Load cart data from localStorage
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                cart = JSON.parse(storedCart);
                addCartToHTML();
            }
        })
        .catch(error => {
            console.error('Error loading product data:', error);
        });
};

// Initialize the app
const toggleBtn = document.querySelector('.toggle_btn');
const exitBtn = document.querySelector('.exit_btn');
const drawer = document.getElementById('drawer');

toggleBtn.addEventListener('click', () => {
    drawer.classList.add('open');
});

exitBtn.addEventListener('click', () => {
    drawer.classList.remove('open');
});

