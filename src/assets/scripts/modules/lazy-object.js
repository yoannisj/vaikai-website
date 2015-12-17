var $body = $('body');

console.log('helloo');

$body.on('lazybeforeunveil', '.js-lazyobj', function(ev) {
  var $lazyObj = $(ev.currentTarget);

  $lazyObj.addClass('is-loading');

  $(ev.target).one('load', function(ev) {
    $lazyObj.removeClass('is-loading').addClass('is-loaded');
  });
});