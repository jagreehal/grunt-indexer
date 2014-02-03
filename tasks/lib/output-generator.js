var Handlebars = require('handlebars');

var OutputGenerator = function(format) {
    this.format = format;
    Handlebars.registerPartial('containerStart',Handlebars.compile('<ul{{#if format.containerClass}} class="{{format.containerClass}}"{{/if}}>'));
    Handlebars.registerPartial('containerEnd',Handlebars.compile('</ul>'));
    Handlebars.registerPartial('itemStart',Handlebars.compile('<li><h1>{{@key}}</h1><ul>'));
    Handlebars.registerPartial('itemEnd',Handlebars.compile('</ul></li>'));
    Handlebars.registerPartial('itemContent',Handlebars.compile('<li><a href="{{link}}">{{filename}}</a></li>'));
    this.template = Handlebars.compile('{{>containerStart}}{{#each data}}{{>itemStart}}{{#each files}}{{>itemContent}}{{/each}}{{>itemEnd}}{{/each}}{{>containerEnd}}');
};

OutputGenerator.prototype.containerStart = function () {
    return Handlebars.compile('{{>containerStart}}')({format: this.format});
};

OutputGenerator.prototype.containerEnd = function () {
    return Handlebars.compile('{{>containerEnd}}')();
};

OutputGenerator.prototype.itemStart = function (data) {
    return Handlebars.compile('{{#each data}}{{>itemStart}}{{/each}}')(data);
};

OutputGenerator.prototype.itemEnd = function () {
    return Handlebars.compile('{{>itemEnd}}')();
};

OutputGenerator.prototype.itemContent = function (data) {
    return Handlebars.compile('{{>itemContent}}')(data);
};

OutputGenerator.prototype.all = function (data) {
    return this.template({format: this.format, data: data});
};

module.exports = OutputGenerator;