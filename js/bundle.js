(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {

  var openGallery = function openGallery(e) {
    e.preventDefault();

    var container = document.querySelector('.gallery-container');
    var content = document.querySelector('main');
    var image = e.target.parentElement.querySelector('img');

    container.querySelector('img').src = image.src;
    container.querySelector('.caption').innerHTML = image.alt;

    content.classList.add('hide');
    container.classList.add('open');
  };

  var closeGallery = function closeGallery(e) {
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

  var handleKeyUp = function handleKeyUp(e) {

    // esc in gallery closes gallery
    if (e.key === "Escape" && document.querySelector('.gallery-container').classList.contains("open")) {
      closeGallery();
    }
  };

  var images = document.querySelectorAll('.gallery-open');
  images.forEach(function (image) {
    image.addEventListener('click', openGallery);
  });

  document.querySelector('.close').addEventListener('click', closeGallery);
  window.addEventListener('keyup', handleKeyUp);
})();

},{}]},{},[1]);
