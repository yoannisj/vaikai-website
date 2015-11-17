var Base = require('class-extend');
var capitalize = require('utils/capitalize');
var getArgs = require('utils/get-args');

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

    // create cache containers
    this.clearCache();

    // reference to widget element
    this.$el = el instanceof jQuery ? el : $(el);
    this.el = this.$el[0];

    // inject defaults
    this.settings = $.extend(true, {}, this.defaults, options);

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

  // Settings
  getSetting: function(name, dynamic) {
    var setting = this.settings[name];

    // evaluate dynamic settings
    if (dynamic && typeof setting == 'function') {
      return setting.apply(this, getArgs(arguments, 3));
    }

    return setting;
  },

  // Classnames
  getClassname: function(name) {
    // classname =
    var classname = _cache[this.cid].classnames[name];

    if (!classname) {
      // get classname from widget settings
      classname = this.settings.classnames[name];
      // build default class if no class was found
      if (!classname) classname = this.classname + '-' + name.toLowerCase();

      // cache classname for later access
      _cache[this.cid].classnames[name] = classname;
    }

    return classname;
  },

  // alias for 'getClassname'
  cname: function(name) { return this.getClassname(name); },

  // Selectors
  getSelector: function() {
    // get classname for each selected element
    var self = this;
    var classnames = $.map(arguments, function(name) {
      return '.' + self.getClassname(name);
    });

    return classnames.join(', ');
  },

  // alias for 'getSelector'
  slct: function() {
    return this.getSelector.apply(this, arguments);
  },

  // Find descendant element(s) based on their name
  getElement: function() {
    this.$el.find(this.getSelector.apply(this, arguments));
  },

  find: function() {
    return this.getElement.apply(this, arguments);
  },

  // Data
  // helper method to get data from widget's element
  data: function(name, df) {
    // check for cached data first
    var data = _cache[this.cid].data[name];

    // if data was not cached before
    if (!data) {
      // get namespaced $el data
      data = this.$el.data(this.name + capitalize(name));
      // or get regular data from element and df value
      if (!data) data = this.$el.getData(name, df);

      // cache data
      _cache[this.cid].data[name] = data;
    }

    return data;
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

    return this;
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

    return this;
  },

  // stop listening to all events at once
  // - counter-part for widget's having a 'listen' method
  //    to start listening to all relevant events
  stopListening: function() {
    return this.off();
  },

  // Chaining
  element: function() {
    return this.$el;
  },

  el: function() { return this.element(); },

  // Cache
  clearCache: function() {
    _cache[this.cid] = {
      data: {},
      classnames: {}
    };
  },

  // Destroy
  destroy: function() {
    this.off();
    this.$el.removeData(this.name);
    this.$el.removeClass(this.initclass);

    return this.$el;
  }

});