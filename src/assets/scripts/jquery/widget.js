// helper method to create a widget on an element
// – avoids multiple instanciations
$.fn.widget = function(Widget, options) {
  var name = (typeof Widget === 'string') ? Widget : Widget.prototype.name,
    key = 'widget_' + name;

  // instanciate widget and attach it to the element
  this.each(function() {
    var $this = $(this),
      instance = $this.data( key );

    if (!instance) {
      instance = new Widget( $this, options );
      $this.data( key, instance );
    }
  });

  return this.first().data( key );
};