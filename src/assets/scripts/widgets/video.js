var BaseWidget = require('widgets/base');
var isMobile = require('utils/is-mobile')();

var Video = module.exports = BaseWidget.extend({

  name: 'video',

  defaults: {
    autoplay: false
  },

  init: function() {
    Video.__super__.init.call(this);

    this.$player = this.find('player');
    this.player = this.$player[0];

    // set 'loaded' state
    this._isLoaded = (this.player.contentWindow.document.readyState == 'interactive');

    // autoplay video
    if (this.settings.autoplay && !isMobile) this.play();

    this.listen();
  },

  // load player on first 'play'
  // load 'object-fit' if inside a popup
  listen: function() {
    // TODO: use 'isReady' and vimeo API's 'ready' event
    // update 'loaded' state
    if (!this._isLoaded) {
      var self = this;
      this.$player.one('load', function(ev) {
        console.log('video loaded!');
        self._isLoaded = true;
      });
    }
  },

  _controlPlayer: function( msg ) {
    // execute if player is loaded
    if (this._isLoaded) {
      console.log('control now!');
      this.player.contentWindow.postMessage(
        JSON.stringify(msg),
        '*'
      );
    }

    // or delegate to when player is loaded
    else {
      var self = this;
      console.log('control after load!');

      this.$player.off('load._controlvid')
        .one('load._controlvid', function(ev) {
          self._controlPlayer(msg);
        });
    }
  },

  play: function() {
    console.log('play video!');

    this._controlPlayer({
      method: 'play'
    });

    this.$el.trigger('play', [this]);
  },

  pause: function() {
    console.log('pause video');

    this._controlPlayer({
      method: 'pause'
    });

    this.$el.trigger('pause', [this]);
  },

  stop: function() {
    console.log('stop video');

    this.pause();

    // rewind to beginning
    this._controlPlayer({
      method: 'seekTo',
      value: '00:00'
    });

    this.$el.trigger('stop', [this]);
  }

});

$('[data-init~="video"').widget(Video);