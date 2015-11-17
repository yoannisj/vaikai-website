var BaseWidget = require('widgets/base');

var Collapse = module.exports = BaseWidget.extend({

  name: 'collapse',

  defaults: {
    classnames: {
      expanded: 'is-expanded'
    }
  },

  // Initializing
  init: function() {
    Collapse.__super__.init.call(this);

    // set initial state
    var expanded = this.$el.hasClass(this.cname('expanded'));
    this._expanded = !expanded;
    this[expanded ? 'expand' : 'collapse']();
  },

  // Operations
  expand: function() {
    if (this._expanded) return this;

    // update state
    this._expanded = true;
    this.$el.addClass(this.cname('expanded'));

    return this;
  },

  collapse: function() {
    if (!this._expanded) return this;

    // update state
    this._expanded = false;
    this.$el.removeClass(this.cname('expanded'));

    return this;
  },

  toggle: function() {
    return this[ this._expanded ? 'collapse' : 'expand']();
  }

});