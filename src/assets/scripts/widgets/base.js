var Base = require('class-extend');
var capitalize = require('utils/capitalize');

require('jquery/widget');
require('jquery/get-data');

var cid = 0;
var $body = $('body');

var _cache = {};

var BaseWidget = module.exports = Base.extend({

  defaults: {},
  name: 'widget',

  constructor: function(el, options) {
    // give instance a unique id
    this.cid = cid++;

    _cache[this.cid] = {
      data: {}
    };

    // reference to widget element
    this.$el = el instanceof jQuery ? el : $(el);
    this.el = this.$el[0];

    // inject defaults
    this.options = $.extend(true, {}, this.defaults, options);

    // set classnames
    this.classname = this.classname || 'js-' + this.name;
    this.initclass = 'has-' + this.name;

    // set selector
    this.selector = '.' + this.classname;

    // initialize widget
    this.init();
  },

  // Initialization
  init: function() {
    this.$el.addClass(this.initclass);
  },

  // helper method to get data from widget's element
  getData: function(name, df) {
    // if data was not cached bedore
    if (!_cache[this.cid].data[name]) {
      // get namespaced $el data
      var data = this.$el.data(this.name + capitalize(name));
      // or get regular data from element and df value
      if (!data) data = this.$el.getData(name, df);

      // cache data
      _cache[this.cid].data[name] = data;
    }

    return _cache[this.cid].data[name];
  },

  // Events
  on: function(ev, selector, cb, thisArg) {

    // allow omitting the 'selector' argument
    if (typeof selector == 'function') {
      thisArg = cb;
      cb = selector;
      selector = undefined;
    }

    // add event listener to widget element and apply
    // callback on given thisArg or widget's instance
    var self = this;
    this.$el.on(ev + '.' + this.name, selector, function() {
      cb.apply(thisArg || self, arguments);
    });

    return this.$el;
  },

  off: function(ev, selector, cb, thisArg) {
    // allow omitting the 'selector' argument
    if (typeof selector == 'function') {
      thisArg = cb;
      cb = selector;
      selector = undefined;
    }

    if (cb) {
      // remove widget event listener for given callback only
      var self = this;
      this.$el.off(ev + '.' + this.name, selector, function() {
        cb.apply(thisArg || self, arguments);
      });
    }

    else if (selector) {
      // remove all widget event listeners for given event
      // and given descendant selector
      this.$el.off(ev + '.' + this.name, selector);
    }

    else if (ev) {
      // remove all widget event listeners for given event
      this.$el.off(ev + '.' + this.name);
    }

    else {
      // remove all event listeners for current widget
      this.$el.off('.' + this.name);
    }

    return this.$el;
  },

  // Destroy
  destroy: function() {
    this.off();
    this.$el.removeData(this.name);
    this.$el.removeClass(this.initclass);
  }

}, {
  data: {}
});