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
			folder: 'examples'
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
			grunt.fail.fatal('Please specify an template file');
		}

		// Iterate over all specified file groups.
		this.files.forEach(function(file){
			var templatePath = options.root + file.src;
			if(! grunt.file.exists(templatePath)){
				grunt.warn.fatal('No template found at: ' + templatePath);
			}
			// This will be held in memory!
			var template = grunt.file.read(options.root + file.src);

			var directoryPath = options.root + path.dirname(file).split('/') + '/' + options.folder;
			if(! grunt.file.isDir(directoryPath)){
				grunt.warn.fatal(directoryPath + ' is not a valid directory');
			}

			directoryObjectBuilder(directoryPath, function(directories){
				var outputPath = options.root + file.dest;
				var output = grunt.template.process(template, {data: {content: generator.all(directories)}});

				grunt.file.write(outputPath, output);
				grunt.log.ok('Indexed file "' + outputPath + '" created.');
				done();
			});
		});
	});
};