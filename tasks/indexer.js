/*
 * grunt-indexer
 * 
 *
 * Copyright (c) 2014 Jag Reehal
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt){
	var OutputGenerator = require('./lib/output-generator');
	var path = require('path');


	grunt.registerMultiTask('indexer', 'Index all your examples', function(){
		var done = this.async();
		var options = this.options({
			root: './',
			folder: 'examples',
			containerClass: 'indexer'
		});

		var generator = new OutputGenerator(options);

		var directoryObjectBuilder = function(directoryPath, callback){
			var directories = {};
			grunt.file.recurse(directoryPath, function(abspath, rootdir, subdir, filename){
				if(filename.split('.').pop() === "html"){
					if(! directories[subdir]){
						directories[subdir] = {files: []};
					}
					directories[subdir].files.push({
						'link': abspath.replace(options.root, ''),
						'filename': filename
					});
				}
			});
			callback(directories);
		};

		if(this.files.length === 0){
			grunt.fail.fatal('Please specify a template file');
		}

		this.files.forEach(function(file){

			var templatePath = './' + file.src;
			if(!grunt.file.exists(templatePath)){
				grunt.fail.fatal('No template found at: ' + templatePath);
			}

			// This will be held in memory!
			var template = grunt.file.read(templatePath);

			var directoryPath = options.root + path.dirname(file).split('/') + '/' + options.folder;
			if(! grunt.file.isDir(directoryPath)){
				grunt.fail.fatal(directoryPath + ' is not a valid directory');
			}

			directoryObjectBuilder(directoryPath, function(directories){
				var outputPath = file.dest;
				var output = grunt.template.process(template, {data: {content: generator.all(directories)}});

				grunt.file.write(outputPath, output);
				grunt.log.ok('Indexed file "' + outputPath + '" created.');
				done();
			});
		});
	});
};