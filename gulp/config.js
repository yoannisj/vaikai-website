module.exports = function(env) {

  return {

    paths: {
      src: './src',
      dest: './www',
      lib: './lib',
      content:'<%= paths.src %>/content',
      data: '<%= paths.src %>/data',
      settings: '<%= paths.src %>/settings',
      assets: '<%= paths.src %>/assets',
      bower: './bower_components',
      public: (env.dev ? 'http://localhost:8080' : (env.stage ? 'http://vaikai.com/_stage': 'http://vaikai.com'))
    },

    tasks: {

      'templates': {
        files: {
          main: './templates/pages/*.nunjucks',
          watch: [
            './content/**/*.yaml',
            './templates/**/*.nunjucks'
          ]
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

      'images': {
        base: {
          src: './assets/images',
          dest: './images'
        },
        files: './**/*.{jpg,jpeg,png,gif,svg}'
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
          src: '../',
          dest: '<%= tasks.javascripts.base.dest %>/vendor'
        },
        files: [
          './src/<%= tasks.javascripts.base.src %>/vendor/*.js',
          '<%= paths.bower %>/scrollme/jquery.scrollme.js'
        ]

      }
    }

  };

};