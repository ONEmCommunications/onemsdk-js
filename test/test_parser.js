const assert = require("chai").assert;

const tags = require("../src/tag");
const FormTag = tags.FormTag,
    SectionTag = tags.SectionTag;
const Response = require('../src/index').Response;
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
    });

    it('should return a SectionTag() object from a template file', function () {
        const data = {
            preBody: 'This is pre body',
            myPointsTotal: 30,
            newNewsInfoCount: 10,
            newSurveysCount: 2,
            newClassifiedsCount: 2,
            showProfileComplete: 20
        };
        const section = parser.loadTemplate('test/section_example_1.pug', data);
        assert.strictEqual(section instanceof SectionTag, true);

        const response = Response.fromTag(section);
        assert.strictEqual(response instanceof Response, true);

        const expectedJson = {
            "content_type": "menu",
            "content": {
                "type": "menu",
                "body": [{
                    "type": "content",
                    "description": "This is pre body",
                    "method": null,
                    "path": null
                }, {
                    "type": "option",
                    "description": "My points: 30",
                    "method": 'GET',
                    "path": "/points/"
                }, {
                    "type": "option",
                    "description": "News & info (10)",
                    "method": 'GET',
                    "path": "/newsInfos/Past"
                }, {
                    "type": "option",
                    "description": "Surveys (2)",
                    "method": 'GET',
                    "path": "/surveys/Past"
                }, {
                    "type": "option",
                    "description": "Classifieds (2)",
                    "method": 'GET',
                    "path": "/classifieds/Past"
                }, {
                    "type": "option",
                    "description": "Profile: 20%",
                    "method": 'GET',
                    "path": "/profile/"
                }],
                "header": "some header",
                "footer": null
            }
        };

        assert.strictEqual(JSON.stringify(response), JSON.stringify(expectedJson));
    });
});