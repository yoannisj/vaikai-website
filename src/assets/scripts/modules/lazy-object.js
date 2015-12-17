var $body = $('body');

console.log('helloo');

$body.on('lazybeforeunveil', '.js-lazyobj', function(ev) {
  var $lazyObj = $(ev.currentTarget);

  console.log('loading..');

  $(ev.target).one('load', function(ev) {
    console.log('loaded!');
    $lazyObj.addClass('is-loaded');
  });
});