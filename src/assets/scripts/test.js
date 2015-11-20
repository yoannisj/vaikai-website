// =Media Widget
// =============================================================================
var BaseWidget = require('widgets/base');
var Control = require('widgets/control');

var TestWidget = BaseWidget.extend({
  name: 'test',

  init: function() {
    TestWidget.__super__.init.call(this);
  },

  destroy: function() {
    TestWidget.__super__.destroy.call(this);
  }

});

$('.js-test').widget(TestWidget);
$('.js-ctrl').widget(Control);

// =Cycler
// =============================================================================
var Cycler = require('widgets/cycler');
$('.js-cycler').widget(Cycler);


// =Carousel
// =============================================================================
var Carousel = require('widgets/carousel');
$('.js-carousel').widget(Carousel);


// =Slider
// =============================================================================
var Slider = require('widgets/slider');
$('.js-slider').widget(Slider);

// =Fold
// =============================================================================
var Fold = require('widgets/fold');
$('.js-fold').widget(Fold);

// =MultiFolds
// =============================================================================
var MultiFold = require('widgets/multifold');
$('.js-multifold').widget(MultiFold);
