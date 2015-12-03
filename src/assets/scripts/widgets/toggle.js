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

  toggleOn: function() {
    // stop if alreary on
    if (this._isOn) return this.$el;

    this._isOn = true;
    this.$el.addClass( 'is-on' ).removeClass( 'is-off' );

    return this.$el;
  },

  toggleOff: function() {
    // stop if alreary off
    if (!this._isOn) return this.$el;

    this._isOn = false;
    this.$el.addClass( 'is-off' ).removeClass( 'is-on' );

    return this.$el;
  },

  toggle: function() {
    return this[this._isOn ? 'toggleOff' : 'toggleOn']();
  }

});

$('[data-init~="toggle"]').widget(Toggle);
