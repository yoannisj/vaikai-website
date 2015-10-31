module.exports = function(env) {

  return {
    paths: {
      src: './src',
      dest: './www',
      bower: './bower_components',
      public: 'http://vaikai.local',
      data: '<%= paths.src %>/data'
    },

    tasks: {

      'templates': {
        base: {
          src: './templates',
          dest: './'
        },
        files: {
          main: './*.html.nunjucks',
          watch: './**/*.html.nunjucks'
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