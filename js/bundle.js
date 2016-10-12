(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function Model() {
    _classCallCheck(this, Model);
  }

  _createClass(Model, [{
    key: "get",
    value: function get(property) {
      return this.property;
    }
  }, {
    key: "set",
    value: function set(property, value) {
      this.property = value;
    }
  }]);

  return Model;
}();

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function View(model) {
    _classCallCheck(this, View);

    this.model = model;
  }

  _createClass(View, [{
    key: "listenTo",
    value: function listenTo(eventType, selector, listener) {
      var _this = this;

      document.querySelectorAll(selector).forEach(function (el) {
        el.addEventListener(eventType, listener.bind(_this));
      });
    }
  }]);

  return View;
}();

},{}],3:[function(require,module,exports){
'use strict';

(function () {
  var GalleryModel = require('./gallery/model.js');
  var GalleryView = require('./gallery/view.js');

  var galleryView = new GalleryView(new GalleryModel());
})();

},{"./gallery/model.js":4,"./gallery/view.js":5}],4:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Model = require('../Model.js');

module.exports = function (_Model) {
  _inherits(GalleryModel, _Model);

  function GalleryModel() {
    _classCallCheck(this, GalleryModel);

    return _possibleConstructorReturn(this, (GalleryModel.__proto__ || Object.getPrototypeOf(GalleryModel)).apply(this, arguments));
  }

  return GalleryModel;
}(Model);

},{"../Model.js":1}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = require('../View.js');

module.exports = function (_View) {
  _inherits(GalleryView, _View);

  function GalleryView(model) {
    _classCallCheck(this, GalleryView);

    // defaults
    var _this = _possibleConstructorReturn(this, (GalleryView.__proto__ || Object.getPrototypeOf(GalleryView)).call(this, model));

    _this.imageSelector = '.gallery-open';
    _this.gallerySelector = '.gallery-container';
    _this.contentSelector = 'main';
    _this.imageCollection = document.querySelectorAll('.image-div');
    _this.currentIndex = 0;

    _this.listenTo("click", _this.imageSelector, _this.openGallery);
    _this.listenTo("click", ".close", _this.closeGallery);
    _this.listenTo("click", ".next", _this.nextImage);
    _this.listenTo("click", ".prev", _this.prevImage);

    window.addEventListener("keyup", _this.handleKeyUp.bind(_this));
    return _this;
  }

  _createClass(GalleryView, [{
    key: 'openGallery',
    value: function openGallery(e) {
      e.preventDefault();

      this.currentIndex = e.target.parentElement.getAttribute('data-order');

      var container = document.querySelector(this.gallerySelector);
      var content = document.querySelector(this.contentSelector);

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

      var content = document.querySelector(this.contentSelector);
      var container = document.querySelector(this.gallerySelector);
      var image = document.querySelector(this.gallerySelector + ' img');

      container.querySelector('img').src = "";
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
      if (document.querySelector('.gallery-container').classList.contains("open")) {
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
      var gallery = document.querySelector(this.gallerySelector);

      if (index >= 0 && index < images.length) {
        currentImage = images[index].querySelector('img');
        gallery.querySelector('img').src = currentImage.src;
        gallery.querySelector('img').alt = currentImage.alt;
        gallery.querySelector('.caption').innerHTML = currentImage.alt;
      }
    }
  }]);

  return GalleryView;
}(View);

},{"../View.js":2}]},{},[3]);
