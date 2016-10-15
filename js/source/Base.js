module.exports = class View {

  constructor(el) {
    this.el = el;
  }

  listenTo(eventType, selector, listener) {
    this.el.querySelectorAll(selector).forEach( elem => {
      elem.addEventListener(eventType, listener.bind(this));
    });
  }

}