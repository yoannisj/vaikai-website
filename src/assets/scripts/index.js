// require modules
require('modules/slider');
require('modules/expand');

// require widgets
var Control = require('widgets/control');
var Popup = require('widgets/popup');
var Carousel = require('widgets/carousel');

// initialize widgets
$('.js-ctrl').widget(Control);
$('.js-popup').widget(Popup);
$('.js-carousel').widget(Carousel);