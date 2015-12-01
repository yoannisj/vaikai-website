var debounce = require('debounce');

// window dimensions
var $win = $(window),
  $winFits = $('[data-window-fit]'),
  winW, winH, winR;

function updateWindowDimensions() {

  console.log('updating window dimensions!');

  winW = $win.width();
  winH = $win.height();
  winR = winH / winW;
}

function updateWindowFits() {

  console.log('updating window fits!');

  $winFits.each(function() {
    // carefull: use natural dimensions, not computed dimensions...
    // -> put natural dimensions in 'data-attributes'
    var $winFit = $(this),
      winFitW = $winFit.width(),
      winFitH = $winFit.height(),
      winFitR = winFitH / winFitW;

  });

}

updateWindonwDimensions();
updateWindonwFits();

$win.on('resize', debounce(function() {
  updateWindowDimensions();
  updateWindowFits();
}, 180));