var View = require('../View.js');

module.exports = class GalleryView extends View {

  constructor(model) {
    super(model);

    // defaults
    this.imageSelector = '.gallery-open';
    this.gallerySelector = '.gallery-container';
    this.contentSelector = 'main';
    this.imageCollection = document.querySelectorAll('.image-div');
    this.currentIndex = 0;

    this.listenTo("click", this.imageSelector, this.openGallery);
    this.listenTo("click", ".close", this.closeGallery);
    this.listenTo("click", ".next", this.nextImage);
    this.listenTo("click", ".prev", this.prevImage);

    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  openGallery(e) {
    e.preventDefault();

    this.currentIndex = e.target.parentElement.getAttribute('data-order');
    
    var container = document.querySelector(this.gallerySelector);
    var content = document.querySelector(this.contentSelector);
    
    this.displayImageInGallery(this.currentIndex);

    content.classList.add('hide');
    container.classList.add('open');
  }

  closeGallery(e) {
    if (e) {
      e.preventDefault();
    }

    var content = document.querySelector(this.contentSelector);
    var container = document.querySelector(this.gallerySelector);
    var image = document.querySelector(this.gallerySelector + ' img');

    container.querySelector('img').src = "";
    container.querySelector('.caption').innerHTML = "";
    
    container.classList.remove('open');
    content.classList.remove('hide');
  }

  nextImage(e) {
    if (e) {
      e.preventDefault();  
    }
    
    this.currentIndex++;

    this.displayImageInGallery(this.currentIndex);
  }

  prevImage(e) {
    if (e) {
      e.preventDefault();  
    }
    
    this.currentIndex--;

    this.displayImageInGallery(this.currentIndex);
  }

  handleKeyUp(e) {
    // in-gallery actions
    if ( document.querySelector('.gallery-container').classList.contains("open") ) {
      switch (e.key) {
        case "Escape":
          this.closeGallery();
          break;

        case "ArrowLeft":
          this.prevImage();
          break;

        case "ArrowRight":
          this.nextImage();
          break;
      }
    }
  }

  displayImageInGallery(index) {
    var images = this.imageCollection;
    var currentImage;
    var gallery = document.querySelector(this.gallerySelector);

    if ( index >= 0 && index < images.length ) {
      currentImage = images[index].querySelector('img');
      gallery.querySelector('img').src = currentImage.src;
      gallery.querySelector('img').alt = currentImage.alt;
      gallery.querySelector('.caption').innerHTML = currentImage.alt;
    }
  }

}