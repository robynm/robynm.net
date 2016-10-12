(function() {
  var GalleryModel = require('./gallery/model.js');
  var GalleryView = require('./gallery/view.js');

  var galleryView = new GalleryView(new GalleryModel());
  
}());