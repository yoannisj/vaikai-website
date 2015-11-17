// require modules
require('modules/slider');
require('modules/expand');

// require widgets
var Control = require('widgets/control');
var Popup = require('widgets/popup');

// initialize widgets
$('.js-ctrl').widget(Control);
$('.js-popup').widget(Popup);