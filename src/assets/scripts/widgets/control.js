var BaseWidget = require('widgets/base');

var Control = module.exports = BaseWidget.extend({

  name: 'ctrl',

  // Initializing
  init: function() {
    Control.__super__.init.call(this);

    this._parseData();
    this.listen();
  },

  _parseData: function() {
    var target = this.getData('target').split(':'),
      action = this.getData('action'),
      params = this.getData('params');

    this.$target = $( target[0] );
    this.controller = target[1];
    this.method = action;
    this.params = params ? JSON.parse(params) : [];
  },

  // Events
  listen: function() {
    this.on('click', this.onclick);
  },

  onclick: function(ev) {
    ev.preventDefault();
    this.execute();
  },

  // Operations
  execute: function() {
    var widget = this.$target.widget(this.controller);
    widget[this.method].apply(widget, this.args);
  }

});