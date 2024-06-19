class Carousel {
    constructor() {
        this.images = document.querySelectorAll('ul li');
        this.currentIndex = 0;
        this.showImage(this.currentIndex);
        this.previousButton = document.querySelector('button.previous');
        this.nextButton = document.querySelector('button.next');
        this.addEventListeners();
    }

    showImage(index) {
        this.images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    previousImage() {
        this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
        this.showImage(this.currentIndex);
    }

    nextImage() {
        this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
        this.showImage(this.currentIndex);
    }

    addEventListeners() {
        this.previousButton.addEventListener('click', () => this.previousImage());
        this.nextButton.addEventListener('click', () => this.nextImage());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Carousel();  // Inicializa el carrusel cuando el documento está completamente cargado
});
