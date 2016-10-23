var AppBase = require('./Base.js');

module.exports = class Gallery extends AppBase {

  constructor(el) {
    super(el);

    // defaults
    this.imageSelector = '.gallery-open';
    this.gallerySelector = '.gallery-container';
    this.contentSelector = 'main';
    this.displaySelector = '.modal-image';
    this.imageCollection = this.el.querySelectorAll('.image-div');
    this.currentIndex = 0;

    this.galleryImageSize = window.innerWidth > 640 ? 'large' : 'med';

    this.listenTo("click", this.imageSelector, this.openGallery);
    this.listenTo("click", ".close", this.closeGallery);
    this.listenTo("click", ".next", this.nextImage);
    this.listenTo("click", ".prev", this.prevImage);

    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  openGallery(e) {
    e.preventDefault();
    var container = this.el.querySelector(this.gallerySelector);
    var content = this.el.querySelector(this.contentSelector);

    this.currentIndex = e.target.parentElement.getAttribute('data-order'); 
    this.displayImageInGallery(this.currentIndex);

    content.classList.add('hide');
    container.classList.add('open');
  }

  closeGallery(e) {
    if (e) {
      e.preventDefault();
    }

    var content = this.el.querySelector(this.contentSelector);
    var container = this.el.querySelector(this.gallerySelector);
    var image = this.el.querySelector('.gallery-img');

    container.querySelector(this.displaySelector).src = "";
    container.querySelector('.caption').innerHTML = "";
    
    container.classList.remove('open');
    content.classList.remove('hide');
  }

  nextImage(e) {
    if (e) {
      e.preventDefault();  
    }
    
    if ( this.currentIndex < this.imageCollection.length-1 ) {
      this.currentIndex++;
      this.displayImageInGallery(this.currentIndex);
    }
  }

  prevImage(e) {
    if (e) {
      e.preventDefault();  
    }

    if ( this.currentIndex > 0 ) {
      this.currentIndex--;
      this.displayImageInGallery(this.currentIndex);
    }
  }

  handleKeyUp(e) {
    
    // in-gallery actions
    if ( this.el.querySelector('.gallery-container').classList.contains("open") ) {
      switch (e.keyCode) {
        case 27: // Escape
          this.closeGallery();
          break;

        case 37: // Left arrow
          this.prevImage();
          break;

        case 39: // Right arrow
          this.nextImage();
          break;
      }
    }
  }

  displayImageInGallery(index) {
    var images = this.imageCollection;
    var currentImage;
    var gallery = this.el.querySelector(this.gallerySelector);

    
    currentImage = images[index].querySelector('img');
    gallery.querySelector(this.displaySelector).src = currentImage.getAttribute('data-src-' + this.galleryImageSize);
    gallery.querySelector(this.displaySelector).alt = currentImage.alt;
    gallery.querySelector('.caption').innerHTML = currentImage.alt;
  }

}