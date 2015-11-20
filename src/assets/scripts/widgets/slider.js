var BaseWidget = require('widgets/base');
var breakpoints = require('data.json').breakpoints;

require('flexslider');

var Slider = module.exports = BaseWidget.extend({

  name: 'slider',

  defaults: {
    sliderSettings: {
      smoothHeight: true,
      slideshow: false,
      animationLoop: false,
      animationSpeed: 400,
      keyboard: false,
      multipleKeyboard: false
    }
  },

  init: function() {
    Slider.__super__.init.call(this);
    this.initSlider();
  },

  initSlider: function() {
    var flexSettings = $.extend({}, this.setting('sliderSettings'), {
      selector: this.slct('items') + ' ' + this.slct('item'),
      animation: 'slide',
      directionNav: true,
      controlNav: false,
      itemWidth: this.$el.width(),
      minItems: 1,
      maxItems: 1,
      prevText: '<span class="sr-only">Previous Item</span>',
      nextText: '<span class="sr-only">Next Item</span>'
    });

    this.slider = this.$el.flexslider(flexSettings).data('flexslider');
    this.$el.addClass('has-flexslider');
  },

  destroy: function() {
    this.slider.destroy();
    Slider.__super__.destroy.call(this);
  }

});

// auto-init widgets
$('[data-init~="slider"]').widget(Slider);
