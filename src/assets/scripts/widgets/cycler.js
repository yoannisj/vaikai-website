var BaseWidget = require('widgets/base');

var Cycler = module.exports = BaseWidget.extend({

  name: 'cycler',

  defaults: {
    startAt: 0,
    directionNav: true,
    clickThrough: false,
  },

  init: function() {
    Cycler.__super__.init.call(this);

    this.$items = this.find('item');
    this._build();
    this.listen();
    this._start();
  },

  _build: function() {
    if (this.setting('directionNav')) {
      this._buildDirNav();
    }
  },

  _buildDirNav: function() {
    var dirNav = '';

    dirNav += '<ul class="' + this.cname('direction-nav') + '">';
    dirNav += '<li><a href="#" class="' + this.cname('prev') + '">';
    dirNav += '<span class="sr-only">Previous Item</span>'  + '</a></li>';
    dirNav += '<li><a href="#" class="' + this.cname('next') + '">';
    dirNav += '<span class="sr-only">Next Item</span>' + '</a></li>';
    dirNav += '</ul>';

    this.$el.append(dirNav);
  },

  listen: function() {
    if (this.settings.clickThrough) {
      this.on('click', this.slct('item'), function(ev) {
        var index = this.$items.index(ev.currentTarget);
        this.go(this._getNextIndex(index));
      });
    }

    if (this.settings.directionNav) {
      this.on('click', this.slct('prev'), function(ev) {
        ev.preventDefault();
        this.previous();
      });

      this.on('click', this.slct('next'), function(ev) {
        ev.preventDefault();
        this.next();
      });
    }
  },

  _getNextIndex: function(index) {
    index = index === undefined ? this.current : index;
    return index < this.$items.length - 1 ? index + 1 : 0;
  },

  _getPrevIndex: function(index) {
    index = index === undefined ? this.current : index;
    return index > 0 ? index - 1 : this.$items.length - 1;
  },

  _start: function() {
    var startAt = this.setting.startAt;

    this.current = startAt;
    this.$current = this.$items.eq(startAt);
    this.$current.addClass('active');
  },

  go: function(index) {
    // don't go if target is already active
    if (this.current == index) return;

    var $current = this.$current,
      $target = this.$items.eq(index);

    this.$el.trigger('before', [this, index]);

    $current.removeClass('active');
    $target.addClass('active');

    this.current = index;
    this.$current = this.$items.eq(index);

    this.$el.trigger('after', [this, index]);
  },

  next: function() {
    this.go(this._getNextIndex());
  },

  previous: function() {
    this.go(this._getPrevIndex());
  }

});

// auto-init widgets
$('[data-init~="cycler"]').widget(Cycler);
