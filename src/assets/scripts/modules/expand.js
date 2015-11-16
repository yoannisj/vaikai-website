var $ = require('jquery');
require('modules/slider');

var $window = $(window),
  $expands = $('.expand');

// udpate expands
updateExpands();
// $window.on('resize', updateExpands);

function updateExpands()
{
  $expands.each(function() {
    updateExpand($(this));
  });
}

function updateExpand( $expand )
{
  if ($expand.find('.expand-body').hasClass('has-slider')) {
    destroyExpand( $expand );
  }

  else {
    initExpand( $expand );
  }
}

function initExpand( $expand )
{
  var $expBody = $expand.find('.expand-body');

  // udpate body
  updateExpandBody($expBody);
  $expand.on('click.expand', '.expand-toggle', function(ev) {
    ev.preventDefault();
    updateExpandBody($expBody);

    // update scroll position
    $('html,body').animate({
      scrollTop: $expBody.offset().top - 120
    }, 300, 'linear');
  });
}

function destroyExpand( $expand )
{
  $expand.find('.expand-body')
    .css('height', '')
    .removeClass('is-collapsed is-expanded');
  $expand.off('.expand');
}

function updateExpandBody( $expBody )
{
  var $items = $expBody.find('.expand-item'),
    top = $expBody.offset().top,
    colBottom = top,
    expBottom = top;

  $items.map(function() {
    var $item = $(this),
      isSummary = $item.hasClass('expand-summary'),
      bottom = $item.offset().top + $item.height();

    if ($item.hasClass('expand-summary')) {
      console.log('yay, expand-item!');
      colBottom = Math.max(colBottom, bottom);
    }

    expBottom = Math.max(expBottom, bottom);
  });

  var h = colBottom - top;
  var sH = expBottom - top;

  // collapse expand body
  if ($expBody.hasClass('is-expanded')) {
    $expBody.addClass('is-collapsed').removeClass('is-expanded');
    $expBody.css('height', h);
  }

  // expand collapsed body
  else if ($expBody.hasClass('is-collapsed')) {
    $expBody.addClass('is-expanded').removeClass('is-collapsed');
    $expBody.css('height', sH);
  }
}