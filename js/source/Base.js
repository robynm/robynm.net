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

}