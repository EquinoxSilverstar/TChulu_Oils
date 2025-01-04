const toggleBtn = document.querySelector('.toggle_btn');
const exitBtn = document.querySelector('.exit_btn');
const drawer = document.getElementById('drawer');

toggleBtn.addEventListener('click', () => {
    drawer.classList.add('open');
});

exitBtn.addEventListener('click', () => {
    drawer.classList.remove('open');
});

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
