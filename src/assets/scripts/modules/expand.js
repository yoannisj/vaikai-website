var $ = require('jquery');
require('modules/slider');

var $window = $(window);

function updateExpandBody( $body ) {
  // collapse expanded expands
  if ($body.hasClass('is-expanded')) {
    $body.addClass('is-collapsed').removeClass('is-expanded');
    $body.find('.expand-item').not('.expand-summary').css('display', 'none');
  }

  // expand collapsed expands
  else if ($body.hasClass('is-collapsed')) {
    $body.addClass('is-expanded').removeClass('is-collapsed');
    $body.find('.expand-item').not('.expand-summary').css('display', '');
  }
}

$('.expand-toggle').on('click.expand', function(ev) {

  var $toggle = $(this),
    $body = $toggle.closest('.expand').find('.expand-body');

  console.log('toggle', $toggle);
  console.log('expand-body', $body);

  // don't touch expands which are currently using a slider
  if ($body.hasClass('has-slider')) return;

  updateExpandBody($body);
});

$('.expand-body').each(function() {
  updateExpandBody($(this));
});