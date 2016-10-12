module.exports = class View {

  constructor(model) {
    this.model = model;
  }

  listenTo(eventType, selector, listener) {
    document.querySelectorAll(selector).forEach( el => {
      el.addEventListener(eventType, listener.bind(this));
    });
  }

}