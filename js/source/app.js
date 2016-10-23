(function() {

  var LazyLoadView = require('./LazyLoad.js');
  var GalleryView = require('./Gallery.js');

  var lazyLoadView = new LazyLoadView(document.querySelector('.container'));
  var galleryView = new GalleryView(document.querySelector('.container'));
  
}());