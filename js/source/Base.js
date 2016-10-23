module.exports = class View {

  constructor(el) {
    this.el = el;
  }

  listenTo(eventType, selector, listener) {
    var elements = this.el.querySelectorAll(selector);

    Array.prototype.forEach.call(elements, elem => {
      elem.addEventListener(eventType, listener.bind(this));
    });
  }

  debounce(func, wait, immediate) {
    var timeout;

    return function() {
      var context = this, args = arguments;
      var later = function() {
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

}