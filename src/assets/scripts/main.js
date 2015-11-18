require('modules/menu');

// var Base = require('class-extend');
// var Parent = Base.extend({

//   patience: 2000,

//   constructor: function() {
//     this.init.apply(this, arguments);
//   },

//   init: function(name) {
//     this.name = name;
//   },

//   sayHello: function() {
//     console.log('[', this.name, '] hello, my name is', this.name);
//     var self = this;

//     setTimeout(function() {
//       self.sayGoodbye();
//     }, this.patience);
//   },

//   sayGoodbye: function() {
//     console.log('[', this.name ,'] ..alright, see you later then!');

//     var self = this;
//     setTimeout(function() {
//       self.postScript();
//     }, this.patience * 4);
//   },

//   postScript: function() {
//     console.log('[', this.name, '] please don\'t make the mistake of trusting my son!');
//   }

// });

// var Child = Parent.extend({

//   patience: 500,

//   init: function(name, nickname) {
//     Child.__super__.init.call(this, name);

//     this.nickname = nickname;
//   },

//   sayHello: function() {
//     Child.__super__.sayHello.call(this);
//     console.log('[', this.name, '] but you can call me', this.nickname);
//   },

//   postScript: function() {
//     console.log('[', this.name, '] psst, let\'s meet in the garden in 10min.');
//   }

// });

// var oli = new Parent('oliver');
// var al = new Child('alfred', 'al\'');


// oli.sayHello();
// al.sayHello();

