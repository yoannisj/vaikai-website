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
    this._expanded = this.$el.hasClass(this.cname('expanded'));
    this.update();
  },

  update: function() {
    if (this._expanded) {
      this._expanded = false;
      this.expand();
    }

    else {
      this._expanded = true;
      this.collapse();
    }
  },

  // Operations
  expand: function() {
    if (this._expanded) return this;

    // update state
    this._expanded = true;
    this.$el.addClass(this.cname('expanded'));
    this.$el.trigger('expand');

    return this;
  },

  collapse: function() {
    if (!this._expanded) return this;

    // update state
    this._expanded = false;
    this.$el.removeClass(this.cname('expanded'));
    this.$el.trigger('collapse');

    return this;
  },

  toggle: function() {
    var fn = this[this._expanded ? 'collapse' : 'expand'];
    return fn.apply(this, arguments);
  }

});

// auto-init widgets
$('[data-init~="collapse"]').widget(Collapse);
