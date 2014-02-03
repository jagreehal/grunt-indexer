/*
 * grunt-indexer
 * https://github.com/jagreehal/grunt-indexer
 *
 * Copyright (c) 2014 Jag Reehal
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt){
	// load all npm grunt tasks
	require('load-grunt-tasks')(grunt);
	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'tasks/**/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		// Configuration to be run (and then tested).
		indexer: {
			default_options: {
				options: {
					folder: 'test/fixtures/examples'
				},
				src: ['test/fixtures/index.html'],
				dest: 'tmp/default/index.html'
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/**/*_test.js']
		},
		watch: {
			scripts: {
				files: ['<%= jshint.all %>'],
				tasks: ['clean', 'indexer', 'nodeunit']
			}
		}
	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'indexer', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test', 'watch']);

};