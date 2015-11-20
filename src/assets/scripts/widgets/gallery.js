var BaseWidget = require('widgets/base');
var Control = require('widgets/control');
var Popup = require('widgets/popup');
var Cycler = require('widgets/cycler');

var breakpoints = require('data.json').breakpoints;

var Gallery = module.exports = BaseWidget.extend({

  name: 'gallery',

  defaults: {},

  init: function() {
    Gallery.__super__.init.call(this);

    this.$items = this.find('item');
    this.listen();
  },

  _initPopup: function() {
    this.$popup = this.find('popup');

    // initialize popup widget
    this.popup = this.$popup.widget(Popup);
  },

  _initCycler: function() {
    this.$cycler = this.find('cycler');
    this.cycler = this.$cycler.widget(Cycler, {
      baseClass: this.baseClass
    });
  },

  listen: function() {
    this.one('click', this.slct('link'), this._onFirstClickLink);
    this.on('expand', this.slct('popup'), this._onFirstOpenPopup);
  },

  _onFirstClickLink: function(ev) {
    this._initPopup();

    // go on with normal thumb 'click' behaviour
    this._onClickLink(ev);
    this.on('click', this.slct('link'), this._onClickLink);
  },

  _onClickLink: function(ev) {
    ev.preventDefault();

    var itemName = $(ev.currentTarget).attr('data-item-name');
    this.openItem( itemName );
  },

  _onFirstOpenPopup: function(ev) {
    this._initCycler();
  },

  // Operations
  openItem: function( name ) {
    var $item = this.$items.filter('[data-name=' + name + ']'),
      index = this.$items.index($item);

    this.popup.open();
    this.cycler.go(index);
  },

  destroy: function() {
    if (this.popup) this.popup.destroy();
    if (this.cycler) this.cycler.destroy();
    Gallery.__super__.destroy.call(this);
  }

});

// auto-init widgets
$('[data-init~="gallery"]').widget(Gallery);
