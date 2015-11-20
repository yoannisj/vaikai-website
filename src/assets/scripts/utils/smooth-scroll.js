module.exports = function($scroller, target, speed, offset) {
  // get scrollTop position
  var sTop = typeof target == 'number' ? target :
    (target instanceof jQuery ? target : $(target)).offset().top;

  $scroller.animate({
    scrollTop: sTop + (offset || 0)
  }, speed);

};