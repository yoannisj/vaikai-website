// require widgets
require('modules/lazy-object');
require('widgets/control');
require('widgets/popup');
require('widgets/gallery');
require('widgets/carousel');
require('widgets/video');

var Fold = require('widgets/fold'),
  $playdatesCtrl = $('.js-ctrl[data-target="#playdates-form:fold"]'),
  $playdatesForm = $('#playdates-form');

$playdatesForm.widget(Fold, {
  scroll: -120
});

$playdatesForm.on('expand', function(ev) {
  $playdatesCtrl.remove();
});

console.log('playdatesCtrl', $playdatesCtrl[0]);