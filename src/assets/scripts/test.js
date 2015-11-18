// =Media Widget
// =============================================================================
var BaseWidget = require('widgets/base');

var TestWidget = BaseWidget.extend({
  name: 'test',

  init: function() {
    TestWidget.__super__.init.call(this);
    console.log('init widget!');
  },

  destroy: function() {
    TestWidget.__super__.destroy.call(this);
    console.log('destroy widget!');
  }

});

$('.js-test').widget(TestWidget);

// =Carousel
// =============================================================================
var Carousel = require('widget/carousel');
