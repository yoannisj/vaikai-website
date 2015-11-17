if (!Modernizr.svg)
{
  $('body').on('error', '[src$=.svg]', function(ev) {
    var $img = $(this),
      fallback = $img.attr('data-svg-fallback');

    $img.attr('src', fallback);
  });
}