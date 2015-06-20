module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'public/css/style.css': 'sass/style.scss'
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          /*'public/css/style.min.css' : ['public/css/style.css'], -- need cssmin for that*/ 
          'public/js/app.min.js' : ['public/js/app.js'],
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'public/css/style.min.css' : ['public/css/style.css']
        }
      }
    },
    watch: {
      source: {
        files: ['sass/**/*.scss', 'views/**/*.hbs', 'js/**/*.js'],
        tasks: ['sass','uglify','cssmin'],
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
  grunt.registerTask('default', ['sass']);
};
