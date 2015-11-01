module.exports = function(env) {

  return {
    paths: {
      src: './src',
      dest: './www',
      lib: './lib',
      content:'<%= paths.src %>/content',
      data: '<%= paths.src %>/data',
      bower: './bower_components',
      public: 'http://vaikai.local'
    },

    tasks: {

      'templates': {
        base: {
          src: './templates',
          dest: './'
        },
        files: {
          main: './pages/*.nunjucks',
          watch: './**/*.nunjucks'
        }
      },

      'assets': {
        base: {
          src: './assets/'
        },
        files: [
          '**/*',
          '!styles',
          '!styles/**/*',
          '!scripts',
          '!scripts/**/*'
        ]
      },

      'stylesheets': {
        base: {
          src: './assets/styles',
          dest: './css'
        },
        files: {
          main: './*.scss',
          watch: './**/*.scss'
        }
      },

      'javascripts': {
        base: {
          src: './assets/scripts',
          dest: './js'
        },
        files: {
          main: './*.js',
          watch: './**/*.js'
        }
      },

      'externals': {
        base: {
          src: '<%= tasks.javascripts.base.src %>/vendor',
          dest: '<%= tasks.javascripts.base.dest %>/vendor'
        },
        files: './*.js'
      }
    }

  };

};