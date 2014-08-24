module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	
    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        src: ['src/messageResource.js', 'src/util.js'],
        dest: 'dist/messageResource.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/messageResource.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
	jshint: {
      files: ['Gruntfile.js', 'src/*.js'],
      options: {
        jshintrc: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};