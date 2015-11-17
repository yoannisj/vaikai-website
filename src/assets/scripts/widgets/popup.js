var BaseWidget = require('widgets/base');

var $body = $('body');

var Popup = module.exports = BaseWidget.extend({

  name: 'popup',

  // Initializing
  init: function() {
    Popup.__super__.init.call(this);
  },

  // Operations
  expand: function() {
    if (this._expanded) return false;

    // update state
    this._expanded = true;
    this.$el.addClass('is-expanded');
    $body.addClass('has-open-popup');

    // listen to descendant closing elements
    this.on('click', '.js-popup-close, .js-popup-backdrop', function(ev) {
      ev.preventDefault();
      this.collapse();
    });
  },

  collapse: function() {
    if (!this._expanded) return true;

    // update state
    this._expanded = false;
    this.$el.removeClass('is-expanded');
    $body.removeClass('has-open-popup');

    // stop listenting to descendant closing elements
    this.off('click', '.popup-close, .popup-backdrop');
  },

  toggle: function() {
    this[ this._expanded ? 'expand' : 'collapse']();
  },

  // Aliases
  open: function() { this.expand(); },
  close: function() { this.collapse(); }

});