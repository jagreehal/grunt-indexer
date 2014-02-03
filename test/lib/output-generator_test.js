var OutputGenerator = require('../../tasks/lib/output-generator');

var format = {
    'containerClass': 'start'
};

var data = {
    Directory1: {
        files: [
            {
                filename: 'filename11',
                link: 'link11'
            },
            {
                filename: 'filename12',
                link: 'link12'
            }
        ]
    },
    Directory2: {
        files: [
            {
                filename: 'filename21',
                link: 'link21'
            },
            {
                filename: 'filename22',
                link: 'link22'
            },
            {
                filename: 'filename23',
                link: 'link23'
            }
        ]
    }
};

var generator = new OutputGenerator(format);

exports.group = {
    containerStart: function (test) {
        test.expect(1);

        test.strictEqual(generator.containerStart(), '<ul class="start">');
        test.done();
    },
    containerEnd: function (test) {
        test.expect(1);
        test.strictEqual(generator.containerEnd(), '</ul>');
        test.done();
    },
    itemStart: function (test) {
        test.expect(1);
        test.strictEqual(generator.itemStart({data:{'folderName':{}}}), '<li><h1>folderName</h1><ul>');
        test.done();
    },
    itemEnd: function (test) {
        test.expect(1);
        test.strictEqual(generator.itemEnd(), '</ul></li>');
        test.done();
    },
    itemContent: function (test) {
        test.expect(1);
        var item = {filename: 'a.html', link: 'http://www.xxx.com'};
        var expected = '<li><a href="http://www.xxx.com">a.html</a></li>';

        test.strictEqual(generator.itemContent(item), expected);
        test.done();
    },
    template: function (test) {
        test.expect(1);
        test.strictEqual(generator.all(data), '<ul class="start"><li><h1>Directory1</h1><ul><li><a href="link11">filename11</a></li><li><a href="link12">filename12</a></li></ul></li><li><h1>Directory2</h1><ul><li><a href="link21">filename21</a></li><li><a href="link22">filename22</a></li><li><a href="link23">filename23</a></li></ul></li></ul>');
        test.done();
    }
};