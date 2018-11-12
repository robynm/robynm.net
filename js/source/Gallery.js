import AppBase from './Base.js'

export default class Gallery extends AppBase {

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
    this.listenTo("click", this.gallerySelector, this.handleGalleryClick);

    window.addEventListener("keyup", this.handleKeyUp.bind(this));


  }

  openGallery(e) {
    e.preventDefault();
    const container = this.el.querySelector(this.gallerySelector);
    const body = document.body;

    this.currentIndex = e.target.parentElement.getAttribute('data-order'); 
    this.displayImageInGallery(this.currentIndex);

    body.classList.add('no-scroll');
    container.classList.add('open');
  }

  closeGallery(e) {
    if (e) {
      e.preventDefault();
    }

    const body = document.body;
    const container = this.el.querySelector(this.gallerySelector);
    const image = this.el.querySelector('.gallery-img');

    container.querySelector(this.displaySelector).src = "";
    container.querySelector('.caption').innerHTML = "";
    
    container.classList.remove('open');
    body.classList.remove('no-scroll');
    this.resetControlVisibility();
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

  handleGalleryClick(e) {    
    // close gallery on background click
    // ignore if gallery isn't open
    if ( e.target.classList.contains('gallery-container') && e.target.classList.contains('open') ) {
      this.closeGallery(e);
    }
    // toggle control visibility on image click
    else if ( e.target.classList.contains('image-container') || e.target.classList.contains('modal-image') ) {
      this.toggleControlVisibility();
    }
  }

  toggleControlVisibility() {
    const controls = Array.prototype.slice.call(document.querySelectorAll('.nav'));
    controls.forEach(control => control.classList.toggle('opacity-0'));
  }

  resetControlVisibility() {
    const controls = Array.prototype.slice.call(document.querySelectorAll('.nav'));
    controls.forEach(control => control.classList.remove('opacity-0'));
  }

  displayImageInGallery(index) {
    const images = this.imageCollection;
    const gallery = this.el.querySelector(this.gallerySelector);
    
    const currentImage = images[index].querySelector('img');
    const galleryImage = gallery.querySelector(this.displaySelector);

    galleryImage.classList.add('loading');
    galleryImage.addEventListener( 'load', function() {
      galleryImage.classList.remove('loading');
    });

    galleryImage.src = currentImage.getAttribute('data-src-' + this.galleryImageSize);
    galleryImage.alt = currentImage.alt;
    gallery.querySelector('.caption').innerHTML = currentImage.alt;
  }

}
