var BaseWidget = require('widgets/base');
var debounce = require('debounce');
var $win = $(window);

var ObjectFit = module.exports = BaseWidget.extend({

  name: 'objfit',

  defaults: {
    debounceTime: 180,
    container: null,
    mode: 'contain',
    scale: 1,
    upscale: false,
    center: true
  },

  // initialize widget
  init: function() {
    ObjectFit.__super__.init.call(this);

    // get element's original dimensions
    this._getElementDimensions();

    // get element's container
    var container = this.settings.container || this.$el.parent();
    this.$container = container instanceof jQuery ? container : $(container);

    // set core styles for centered elements
    if (this.settings.center) {
      this.$el.css({
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'right': 'auto',
        'bottom': 'auto',
      });
    }

    // udpate element size
    this.update();
    this.listen();
  },

  // listen to events
  listen: function() {
    // update element dimensions when it gets (re-)loaded
    this.$el.on('load', this._getElementDimensions);

    // resize/position element when window gets resized
    var self = this;
    $win.on('resize', debounce(function() {
      self.update();
    }, this.settings.debounceTime));
  },

  // get natural dimensions of element
  // - (natural dimensions should be given in html attributes)
  _getElementDimensions: function() {

    console.log('getting object fit original dimensions!');

    // get element dimensions
    this._width = this.data('width') || this.$el.attr('width');
    this._height = this.data('height') || this.$el.attr('height');
    this._ratio = this._height / this._width;
  },

  // get element dimensions so it fits inside its container
  _getFitDimensions: function() {
    var cWidth = this.$container.width() * this.settings.scale,
      cHeight = this.$container.height() * this.settings.scale,
      cRatio = cHeight / cWidth,
      w, h;

    if ((this.settings.mode == 'contain' && this._ratio >= cRatio) ||
      (this.settings.mode == 'cover' && this._ratio < cRatio)) {
      // use container height and calculate element width
      h = this.settings.upscale ? cHeight : Math.min(this._height, cHeight);
      w = h / this._ratio;


      // r = h / w
      // h = w * r
      // w = h / r
    }

    else if ((this.settings.mode == 'contain' && this._ratio < cRatio) ||
      (this.settings.mode == 'cover' && this._ratio >= cRatio)) {
      // use container width and calculate element height
      w = this.settings.upscale ? cWidth : Math.min(this._width, cWidth);
      h = w * this._ratio;
    }

    return { width: w, height: h };
  },

  // resize and reposition the element inside its container
  update: function() {

    console.log('updating object fit!');

    var dimen = this._getFitDimensions(),
      styles = {
        'width': dimen.width,
        'height': dimen.height
      };

    // reposition in the center if needed
    if (this.settings.center) {
      styles = $.extend(styles, {
        'margin-top': -0.5 * dimen.height,
        'margin-left': -0.5 * dimen.width
      });
    }

    // apply new size and position
    this.$el.css(styles);
  },

  // delete widget instance and side-effects
  delete: function() {
    var styles = { 'width': '', 'height': '' };

    if (this.settings.center) {
      styles = $.extend(styles, {
        'position': '',
        'top': '',
        'left': '',
        'right': '',
        'bottom': '',
        'margin-left': '',
        'margin-right': ''
      });
    }

    // remove styles added by widget
    this.$el.css(styles);

    ObjectFit.__super__.delete.call(this);
  }

});

$('[data-init~="objfit"]').widget(ObjectFit);

// SAME FORMAT [PORTRAIT]
// ===
// element: 800x600
// eR: 0.75
// container: 400x300
// cR: 0.75
// ----
// -> contain: w 400 | h 300 [400 * 0.75]
// -> cover: w 400 | h 300 [400 * 0.75]

// ===
// element: 800x600
// eR: 0.75
// container: 1600x900
// cR: 0.5625
// ---
// -> contain: w 1200 [900 / 0.75] | h 900
// -> cover: w 1600 | h 1200 [1600 * 0.75]
// ===
// contain [eR > cR] -> use cH and find eW
// cover [eR > cR] -> use cW and find eH

// ===
// element: 1600x900
// eR: 0.5625
// container: 800x600
// cR: 0.75
// ---
// -> contain: w 800 | h 450 [800 * 0.75]
// -> cover: w 1067 [600 / 0.5625] | h 600
// ===
// contain [eR < cR] ->
// cover [eR < cR] ->

// DIFFERENT FORMAT
// ===
// element: 600x800
// eR: 1.333
// container: 900x600
// cR: 0.667
// ---
// -> contain: w 675 [900/1.333] | h 900
// -> cover: w 900| h 1200 [900 * 1.333]
// ==
// contain [eR > cR] -> use cH and find eW
// cover [eR > cR] -> use cW and find eH

// ===
// element: 900x600
// eR: 0.6667
// container: 600x800
// cR: 1.333
// ---
// -> contain: w 600 | h 400 [600 * 0.667]
// -> cover: w 1200 [800 / 0.6667] | h 800
// ===
// contain [eR < cR] -> use cW and find eH
// cover [eR < cR] -> use cH and find eW