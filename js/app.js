(function() {
  
  var openGallery = function(e) {
    e.preventDefault();
    
    var container = document.querySelector('.gallery-container');
    var content = document.querySelector('main');
    var image = e.target.parentElement.querySelector('img');

    // add placeholder where image was moved
    e.target.parentElement.classList.add('in-gallery');

    container.appendChild(image);

    content.classList.add('hide');
    container.classList.add('open');
  };

  var closeGallery = function(e) {
    e.preventDefault();

    var content = document.querySelector('main');
    var container = document.querySelector('.gallery-container');
    var image = document.querySelector('.gallery-container img');
    var parent = document.querySelector('.in-gallery');

    parent.appendChild(image);
    parent.classList.remove('in-gallery');
    container.classList.remove('open');
    content.classList.remove('hide');
  };

  var images = document.querySelectorAll('.gallery-open');
  images.forEach( image => {
    image.addEventListener('click', openGallery);
  });

  document.querySelector('.close').addEventListener('click', closeGallery);

}());