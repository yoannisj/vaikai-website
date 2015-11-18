var BaseWidget = require('widgets/base');
var breakpoints = require('data.json').breakpoints;

require('lightslider');

var Carousel = module.exports = BaseWidget.extend({

  name: 'carousel',

  defaults: {
    sliderSettings: {
      // layout
      item: 3,
      slideMove: 3,
      autoWidth: false,
      slideMargin: 40,
      gallery: false,
      galleryMargin: false,

      // effect
      mode: 'slide',
      speed: 400,
      adaptiveHeight: true,
      auto: false,
      loop: false,
      slideEndAnimation: true,

      // controls
      controls: false,
      pager: true,
      keypress: false,
      enableTouch: true,
      enableDrag: false,
      freeMove: false,

      // responsive
      responsive: [{
        breakpoint: breakpoints['m'],
        settings: {
          item: 2,
          slideMove: 2
        }
      }, {
        breakpoint: breakpoints['s'],
        settings: {
          item: 1,
          slideMove: 1,
          slideMargin: 20
        }
      }]
    }
  },

  init: function() {
    Carousel.__super__.init.call(this);
    this.initSlider();
  },

  initSlider: function() {
    this.$items = this.find('items');
    var settings = this.setting('sliderSettings');

    console.log('slider settings::', settings);

    this.slider = this.$items.lightSlider(settings);
  },

  destroy: function() {
    this.slider.destroy();
    Carousel.__super__.destroy.call(this);
  }

});