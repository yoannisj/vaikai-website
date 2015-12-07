
function getUrlArguments() {
  var search = location.search.substring(1);
  if (search) {
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  } else {
    return {};
  }
  
}

// pre-fill coupon information if there's one
var search = getUrlArguments();
if (search.coupon) {
  $('[data-celery]').attr('data-celery-prefill-coupon', search.coupon);
}


$('select.js-select').on('change', function(event){
  var $select = $(this),
      selection = $select.val();
      

      // hide all
      $('[data-vaikai-option]').hide();
      // show only the right one
      $('[data-vaikai-option='+selection+']').show();

});