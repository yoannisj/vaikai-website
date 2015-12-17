var $body = $('body');

if (!Modernizr.svg)
{
  // lazy-load fallback source instead of svg
  $body.on('lazybeforeunveil', '[src$=.svg]', function(ev) {
    var $img = $(ev.target);

    $img.attr('data-src', $img.attr('data-svg-fallback'));
  });

  // when trying to load an svg, replace source with fallback
  $body.on('error', '[src$=.svg]', function(ev) {
    var $img = $(this),
      fallback = $img.attr('data-svg-fallback');

    $img.attr('src', fallback);
  });
}