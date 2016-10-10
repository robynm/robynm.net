(function() {
  
  var openGallery = function(e) {
    e.preventDefault();
    
    var container = document.querySelector('.gallery-container');
    var content = document.querySelector('main');
    var image = e.target.parentElement.querySelector('img');

    container.querySelector('img').src = image.src;
    container.querySelector('.caption').innerHTML = image.alt;

    content.classList.add('hide');
    container.classList.add('open');
  };

  var closeGallery = function(e) {
    if (e) {
      e.preventDefault();
    }

    var content = document.querySelector('main');
    var container = document.querySelector('.gallery-container');
    var image = document.querySelector('.gallery-container img');

    container.querySelector('img').src = "";
    container.querySelector('.caption').innerHTML = "";
    
    container.classList.remove('open');
    content.classList.remove('hide');
  };

  var handleKeyUp = function(e) {

    // esc in gallery closes gallery
    if ( e.key === "Escape" && document.querySelector('.gallery-container').classList.contains("open") ) {
      closeGallery();
    }
  };

  var images = document.querySelectorAll('.gallery-open');
  images.forEach( image => {
    image.addEventListener('click', openGallery);
  });

  document.querySelector('.close').addEventListener('click', closeGallery);
  window.addEventListener('keyup', handleKeyUp);

}());