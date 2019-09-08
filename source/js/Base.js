export default class View {

  constructor(el) {
    this.el = el;
  }

  listenTo(eventType, selector, listener) {
    const elements = this.el.querySelectorAll(selector);

    Array.prototype.forEach.call(elements, elem => {
      elem.addEventListener(eventType, listener.bind(this));
    });
  }

  debounce(func, wait, immediate) {
    let timeout;

    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      const callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args);
      }
    };
  }

}
