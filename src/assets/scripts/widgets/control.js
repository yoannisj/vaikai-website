var BaseWidget = require('widgets/base');
var arrayify = require('utils/arrayify');

var Control = module.exports = BaseWidget.extend({

  name: 'ctrl',

  // Initializing
  init: function() {
    Control.__super__.init.call(this);

    this._parseData();
    this.listen();
  },

  _parseData: function() {
    var target = this.data('target').split(':'),
      action = this.data('action'),
      params = this.data('params');

    this.$target = $( target[0] );
    this.controller = target[1];
    this.method = action;
    this.params = params ? arrayify(JSON.parse(params)) : [];
  },

  // Events
  listen: function() {
    this.on('click', this.onclick);

    return this;
  },

  onclick: function(ev) {
    ev.preventDefault();
    this.execute();
  },

  // Operations
  execute: function() {
    var widget = this.$target.widget(this.controller);
    widget[this.method].apply(widget, this.params);

    return this;
  }

});

// auto-init Widgets
$('[data-init~="control"]').widget(Control);
