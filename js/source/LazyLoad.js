var AppBase = require('./Base.js');

module.exports = class LazyLoad extends AppBase {

  constructor(el) {
    super(el);

    this.images = Array.prototype.slice.call(this.el.querySelectorAll('.lazy-load'));
    this.scrollListener = this.debounce(this.loadImages, 50).bind(this);
    this.imageSize = this.getImageSize();

    window.addEventListener("DOMContentLoaded", this.loadImages.bind(this));
    window.addEventListener("scroll", this.scrollListener);
  }

  getImageSize() {
    var screenWidth = window.innerWidth;
    if ( window.innerWidth > 600 ) {
      return 'med';
    }
    return 'small';
  }

  isVisible(element) {
    var bounds = element.getBoundingClientRect();
    return bounds.top > 0 && bounds.top < window.innerHeight;
  }

  loadImage(imageEl) {
    imageEl.src = imageEl.getAttribute('data-src-' + this.imageSize);
    imageEl.classList.remove('lazy-load');
  }

  loadImages() {
    if ( this.images.length === 0 ) {
      window.removeEventListener("scroll", this.scrollListener);
      return;
    }

    this.images = this.images.filter( img => {
      if ( this.isVisible(img) ) {
        this.loadImage(img);
        return false;
      }
      return true;
    });
  }
}