var Control = require('widgets/control');

var Toggle = module.exports = Control.extend({

  name: 'toggle',

  defaults: {},

  init: function() {
    Toggle.__super__.init.call(this);
    this._isOn = this.$el.hasClass( 'is-on' );
  },

  execute: function() {
    Toggle.__super__.execute.call(this);
    this.toggle();
  },

  toggle: function() {
    if (this._isOn) {
      // toggleOff
      this._isOn = false;
      this.$el.addClass( 'is-off' ).removeClass( 'is-on' );
    }

    else {
      // togggleOn
      this._isOn = true;
      this.$el.addClass( 'is-on' ).removeClass( 'is-off' );
    }
  }

});

$('[data-init~="toggle"]').widget(Toggle);
