(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function View(el) {
    _classCallCheck(this, View);

    this.el = el;
  }

  _createClass(View, [{
    key: "listenTo",
    value: function listenTo(eventType, selector, listener) {
      var _this = this;

      this.el.querySelectorAll(selector).forEach(function (elem) {
        elem.addEventListener(eventType, listener.bind(_this));
      });
    }
  }]);

  return View;
}();

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppBase = require('./Base.js');

module.exports = function (_AppBase) {
  _inherits(Gallery, _AppBase);

  function Gallery(el) {
    _classCallCheck(this, Gallery);

    // defaults
    var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this, el));

    _this.imageSelector = '.gallery-open';
    _this.gallerySelector = '.gallery-container';
    _this.contentSelector = 'main';
    _this.displaySelector = '.modal-image';
    _this.imageCollection = _this.el.querySelectorAll('.image-div');
    _this.currentIndex = 0;

    _this.listenTo("click", _this.imageSelector, _this.openGallery);
    _this.listenTo("click", ".close", _this.closeGallery);
    _this.listenTo("click", ".next", _this.nextImage);
    _this.listenTo("click", ".prev", _this.prevImage);

    window.addEventListener("keyup", _this.handleKeyUp.bind(_this));
    return _this;
  }

  _createClass(Gallery, [{
    key: 'openGallery',
    value: function openGallery(e) {
      e.preventDefault();
      var container = this.el.querySelector(this.gallerySelector);
      var content = this.el.querySelector(this.contentSelector);

      this.currentIndex = e.target.parentElement.getAttribute('data-order');
      this.displayImageInGallery(this.currentIndex);

      content.classList.add('hide');
      container.classList.add('open');
    }
  }, {
    key: 'closeGallery',
    value: function closeGallery(e) {
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
  }, {
    key: 'nextImage',
    value: function nextImage(e) {
      if (e) {
        e.preventDefault();
      }

      this.currentIndex++;

      this.displayImageInGallery(this.currentIndex);
    }
  }, {
    key: 'prevImage',
    value: function prevImage(e) {
      if (e) {
        e.preventDefault();
      }

      this.currentIndex--;

      this.displayImageInGallery(this.currentIndex);
    }
  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(e) {
      // in-gallery actions
      if (this.el.querySelector('.gallery-container').classList.contains("open")) {
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
  }, {
    key: 'displayImageInGallery',
    value: function displayImageInGallery(index) {
      var images = this.imageCollection;
      var currentImage;
      var gallery = this.el.querySelector(this.gallerySelector);

      if (index >= 0 && index < images.length) {
        currentImage = images[index].querySelector('img');
        gallery.querySelector(this.displaySelector).src = currentImage.src;
        gallery.querySelector(this.displaySelector).alt = currentImage.alt;
        gallery.querySelector('.caption').innerHTML = currentImage.alt;
      }
    }
  }]);

  return Gallery;
}(AppBase);

},{"./Base.js":1}],3:[function(require,module,exports){
'use strict';

(function () {

  var GalleryView = require('./Gallery.js');
  var galleryView = new GalleryView(document.querySelector('.container'));
})();

},{"./Gallery.js":2}]},{},[3]);
