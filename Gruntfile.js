module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: {
			src: 'app/js',
			dest: '<%= pkg.name %>.<%= pkg.version %>.js'
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			my_target: {
				files: {
					'src/<%= pkg.name %>.<%= pkg.version %>.min.js': ['src/<%= pkg.name %>.<%= pkg.version %>.js']
				}
			}
		},
		concat: {
			basic: {
				src: [
					'<%= dirs.src %>/app.js',
					'<%= dirs.src %>/451.js',
					'<%= dirs.src %>/config.js',
					'<%= dirs.src %>/controllers.js',
					'<%= dirs.src %>/directives.js',
					'<%= dirs.src %>/filters.js',
					'<%= dirs.src %>/interceptors.js',
					'<%= dirs.src %>/routing.js',
					'<%= dirs.src %>/services.js'
				],
				dest: 'src/<%= dirs.dest %>'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concat', 'uglify']);

};