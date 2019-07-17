const assert = require("chai").assert;

const tags = require("../src/tag");
const FormTag = tags.FormTag;
const parser = require("../src/parser");

describe('loadHtml', function () {
    it('should return a FormTag() object from html string', function () {
        let html = '<form path="/route">' +
            '<section name="name" expected-response="exp">' +
            '<p>This is paragraph</p>' +
            '</section>' +
            '</form>';
        const form = parser.loadHtml(undefined, html);
        assert.strictEqual(form instanceof FormTag, true);
    });

    it('should return a FormTag() object from html file', function () {
        const form = parser.loadHtml('test/index.html', undefined);
        assert.strictEqual(form instanceof FormTag, true);
    });
});

describe('loadTemplate', function () {
    it('should return a FormTag() object from template file', function () {
        const data = {
            header: 'This is header',
            footer: 'This is footer',
            items: [{
                href: 'route',
                description: 'This is an option',
            }]
        };
        const form = parser.loadTemplate('test/index.pug', data);
        assert.strictEqual(form instanceof FormTag, true);
    })
});