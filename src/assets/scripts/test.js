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
$('.js-fold').widget(Fold, {
  scrollOffset: -150
});

// =MultiFolds
// =============================================================================
var MultiFold = require('widgets/multifold');
$('.js-multifold').widget(MultiFold, {
  scrollOffset: -150
});

// =ObjectFit
// =============================================================================
var ObjectFit = require('widgets/object-fit');

$('#test-objfit-contain .js-objfit').widget(ObjectFit, {
  mode: 'contain'
});

$('#test-objfit-cover .js-objfit').widget(ObjectFit, {
  mode: 'cover'
});

$('#test-winfit-contain .js-objfit').widget(ObjectFit, {
  container: $(window),
  mode: 'contain',
  scale: 0.8
});

