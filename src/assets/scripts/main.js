require('modules/menu');

console.log('hellooo!');

// fit objects in popups inside the screen
var ObjectFit = require('widgets/object-fit');
var $body = $('body');
var $window = $(window);

$body.on('expand', '.js-popup', function(ev) {
  var $obj = $(ev.currentTarget).find('.js-objfit');

  if ($obj.length) {

    console.log('expand popup with objfit!', $obj[0]);

    $obj.widget(ObjectFit, {
      container: $window,
      scale: 0.75,
      center: false
    });
  }

});
