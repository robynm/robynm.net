(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
  function View(el) {
    _classCallCheck(this, View);

    this.el = el;
  }

  _createClass(View, [{
    key: "listenTo",
    value: function listenTo(eventType, selector, listener) {
      var _this = this;

      var elements = this.el.querySelectorAll(selector);

      Array.prototype.forEach.call(elements, function (elem) {
        elem.addEventListener(eventType, listener.bind(_this));
      });
    }
  }, {
    key: "debounce",
    value: function debounce(func, wait, immediate) {
      var timeout;

      return function () {
        var context = this,
            args = arguments;
        var later = function later() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) {
          func.apply(context, args);
        }
      };
    }
  }]);

  return View;
}();

exports.default = View;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./Base.js');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gallery = function (_AppBase) {
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

    _this.galleryImageSize = window.innerWidth > 640 ? 'large' : 'med';

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

      if (this.currentIndex < this.imageCollection.length - 1) {
        this.currentIndex++;
        this.displayImageInGallery(this.currentIndex);
      }
    }
  }, {
    key: 'prevImage',
    value: function prevImage(e) {
      if (e) {
        e.preventDefault();
      }

      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.displayImageInGallery(this.currentIndex);
      }
    }
  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(e) {

      // in-gallery actions
      if (this.el.querySelector('.gallery-container').classList.contains("open")) {
        switch (e.keyCode) {
          case 27:
            // Escape
            this.closeGallery();
            break;

          case 37:
            // Left arrow
            this.prevImage();
            break;

          case 39:
            // Right arrow
            this.nextImage();
            break;
        }
      }
    }
  }, {
    key: 'displayImageInGallery',
    value: function displayImageInGallery(index) {
      var images = this.imageCollection;
      var currentImage, galleryImage;
      var gallery = this.el.querySelector(this.gallerySelector);

      currentImage = images[index].querySelector('img');
      galleryImage = gallery.querySelector(this.displaySelector);

      galleryImage.classList.add('loading');
      galleryImage.addEventListener('load', function () {
        galleryImage.classList.remove('loading');
      });

      galleryImage.src = currentImage.getAttribute('data-src-' + this.galleryImageSize);
      galleryImage.alt = currentImage.alt;
      gallery.querySelector('.caption').innerHTML = currentImage.alt;
    }
  }]);

  return Gallery;
}(_Base2.default);

exports.default = Gallery;

},{"./Base.js":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./Base.js');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LazyLoad = function (_AppBase) {
  _inherits(LazyLoad, _AppBase);

  function LazyLoad(el) {
    _classCallCheck(this, LazyLoad);

    var _this = _possibleConstructorReturn(this, (LazyLoad.__proto__ || Object.getPrototypeOf(LazyLoad)).call(this, el));

    _this.images = Array.prototype.slice.call(_this.el.querySelectorAll('.lazy-load'));
    _this.scrollListener = _this.debounce(_this.loadImages, 50).bind(_this);
    _this.imageSize = _this.getImageSize();

    window.addEventListener("DOMContentLoaded", _this.loadImages.bind(_this));
    window.addEventListener("scroll", _this.scrollListener);
    return _this;
  }

  _createClass(LazyLoad, [{
    key: 'getImageSize',
    value: function getImageSize() {
      var screenWidth = window.innerWidth;
      if (window.innerWidth > 600) {
        return 'med';
      }
      return 'small';
    }
  }, {
    key: 'isVisible',
    value: function isVisible(element) {
      var bounds = element.getBoundingClientRect();

      return bounds.top > 0 && bounds.top < window.innerHeight || bounds.bottom > 0 && bounds.bottom < window.innerHeight;
    }
  }, {
    key: 'loadImage',
    value: function loadImage(imageEl) {
      imageEl.src = imageEl.getAttribute('data-src-' + this.imageSize);
      imageEl.classList.remove('lazy-load');
    }
  }, {
    key: 'loadImages',
    value: function loadImages() {
      var _this2 = this;

      if (this.images.length === 0) {
        window.removeEventListener("scroll", this.scrollListener);
        return;
      }

      this.images = this.images.filter(function (img) {
        if (_this2.isVisible(img)) {
          _this2.loadImage(img);
          return false;
        }
        return true;
      });
    }
  }]);

  return LazyLoad;
}(_Base2.default);

exports.default = LazyLoad;

},{"./Base.js":1}],4:[function(require,module,exports){
'use strict';

var _LazyLoad = require('./LazyLoad.js');

var _LazyLoad2 = _interopRequireDefault(_LazyLoad);

var _Gallery = require('./Gallery.js');

var _Gallery2 = _interopRequireDefault(_Gallery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {

  var lazyLoadView = new _LazyLoad2.default(document.querySelector('.container'));
  var galleryView = new _Gallery2.default(document.querySelector('.container'));
})();

},{"./Gallery.js":2,"./LazyLoad.js":3}]},{},[4]);
