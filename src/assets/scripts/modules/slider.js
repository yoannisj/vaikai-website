var $ = require('jquery');
var Shift = require('../utils/shift');

var $window = $(window);

// HELPERS
function getSliderItems($slider) {
  return Shift.getAttrValue($slider, 'num-items') || 1;
}

// INITIALIZE
var $sliders = $('.js-slider');

$sliders.each(function() {

  var $slider = $(this),
    destroy = $slider.attr('data-destroy'),
    numItems = getSliderItems($slider),
    itemW = ($slider.width() / numItems);

  // don't initialize slider if the 'destroy' query applies
  if (destroy && parseInt(destroy, 10) < $window.width()) return;

  else {
    $slider.addClass('has-slider')
    .flexslider({
      namespace: "js-slider-",
      selector: ".js-slider-items .js-slider-item",
      animation: "slide",
      smoothHeight: false,
      slideshow: false,
      animationSpeed: 600,
      directionNav: false,
      keyboard: true,
      multipleKeyboard: true,
      itemWidth: itemW,
      minItems: numItems,
      maxItems: numItems,
      itemMargin: 0
    });
  }
});

// UPDATE
$window.resize(function(ev) {

  $sliders.each(function() {
    var $slider = $(this),
      destroy = $slider.attr('data-destroy');

    if (destroy && parseInt(destroy, 10) >= $window.width()) {
      $slider.flexslider('destroy');
      $slider.removeClass('has-slider');
    }

    else {
      var flex = $slider.data('flexslider'),
      numItems = getSliderItems($slider),
      itemW = ($slider.width() / numItems);

      flex.vars.itemWidth = itemW;
      flex.vars.minItems = numItems;
      flex.vars.maxItems = numItems;
    }
  });
});
