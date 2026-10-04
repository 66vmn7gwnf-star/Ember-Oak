
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {

    navToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        navToggle.classList.toggle("active", isOpen);
        navToggle.setAttribute("aria-expanded", isOpen);

    });

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");
            navToggle.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");

        });

    });

}


/* =================================
   EMBER & OAK — GALLERY LIGHTBOX
================================= */

(() => {

    const galleryItems = document.querySelectorAll(".gallery__item");
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImage = document.getElementById("gallery-lightbox-image");
    const lightboxCaption = document.getElementById("gallery-lightbox-caption");
    const counter = document.getElementById("gallery-counter");

    const closeButton = document.getElementById("gallery-close");
    const previousButton = document.getElementById("gallery-prev");
    const nextButton = document.getElementById("gallery-next");

    if (
        !galleryItems.length ||
        !lightbox ||
        !lightboxImage ||
        !lightboxCaption ||
        !counter
    ) {
        return;
    }

    const galleryPhotos = Array.from(galleryItems).map((item) => {
        const image = item.querySelector("img");

        return {
            src: image.src,
            alt: image.alt
        };
    });

    let currentImage = 0;
    let lastFocusedElement = null;

    function showImage(index) {

        currentImage =
            (index + galleryPhotos.length) % galleryPhotos.length;

        const photo = galleryPhotos[currentImage];

        lightboxImage.src = photo.src;
        lightboxImage.alt = photo.alt;
        lightboxCaption.textContent = photo.alt;

        counter.textContent =
            `${currentImage + 1} / ${galleryPhotos.length}`;

    }

    function openLightbox(index) {

        lastFocusedElement = document.activeElement;

        showImage(index);

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        closeButton.focus();

    }

    function closeLightbox() {

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }

    }

    function nextImage() {
        showImage(currentImage + 1);
    }

    function previousImage() {
        showImage(currentImage - 1);
    }

    // Open selected photograph
    galleryItems.forEach((item, index) => {

        item.addEventListener("click", () => {
            openLightbox(index);
        });

    });

    // Navigation
    nextButton.addEventListener("click", nextImage);
    previousButton.addEventListener("click", previousImage);

    // Close button
    closeButton.addEventListener("click", closeLightbox);

    // Close when clicking the dark background
    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    // Keyboard controls
    document.addEventListener("keydown", (event) => {

        if (!lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            nextImage();
        }

        if (event.key === "ArrowLeft") {
            previousImage();
        }

    });

})();
