module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'landing-page/public/css/style.css': 'landing-page/sass/style.scss'
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          /*'public/css/style.min.css' : ['public/css/style.css'], -- need cssmin for that*/
          'landing-page/public/js/app.min.js' : ['public/js/app.js'],
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'landing-page/public/css/style.min.css' : ['public/css/style.purified.css']
        }
      }
    },
    purifycss: {
      target: {
        src: ['landing-page/views/*.hbs'],
        css: ['landing-page/public/css/style.css'],
        dest: 'landing-page/public/css/style.purified.css'
      },
    },
    watch: {
      source: {
        files: ['landing-page/sass/**/*.scss', 'landing-page/views/**/*.hbs', 'landing-page/js/**/*.js'],
        tasks: ['sass','uglify','purifycss','cssmin'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-purifycss');
  /*grunt.registerTask('purifycss', ['purifycss']);*/
  grunt.registerTask('default', ['sass']);
};
