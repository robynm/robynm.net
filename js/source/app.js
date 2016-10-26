import LazyLoadView from './LazyLoad.js'
import GalleryView from './Gallery.js'

(function() {

  var lazyLoadView = new LazyLoadView(document.querySelector('.container'));
  var galleryView = new GalleryView(document.querySelector('.container'));
  
}());