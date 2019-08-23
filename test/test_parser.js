const assert = require("chai").assert;

const tags = require("../src/tag");
const FormTag = tags.FormTag,
    SectionTag = tags.SectionTag;
const Response = require('../src/index').Response;
const parser = require("../src/parser");
const config = require("../src/config");

describe('Test parser', function () {
    before(function () {
        config.setStaticDir('test/statics');
    });

    describe('loadHtml', function () {

        it('should return a FormTag() object from html string', function () {
            let html = '<form action="/route">' +
                '<section name="name" expected-response="exp">' +
                '<p>This is paragraph</p>' +
                '</section>' +
                '</form>';
            const form = parser.loadHtml(undefined, html);
            assert.strictEqual(form instanceof FormTag, true);
        });

        it('should return a FormTag() object from html file', function () {
            const form = parser.loadHtml('index.html', undefined);
            assert.strictEqual(form instanceof FormTag, true);
        });

        it('should ignore the empty <p>', function () {
            let html = '<section name="some name" expected-response="option" footer="a footer">' +
                '<p></p>This is some text<p>Paragraph</p><p></p>Another text' +
                '</section>';
            const section = parser.loadHtml(undefined, html);
            const response = Response.fromTag(section);
            const expected = {
                "content_type": "menu",
                "content": {
                    "type": "menu",
                    "body": [
                        {
                            "type": "content",
                            "description": "This is some text",
                            "method": null,
                            "path": null
                        },
                        {
                            "type": "content",
                            "description": "Paragraph",
                            "method": null,
                            "path": null
                        },
                        {
                            "type": "content",
                            "description": "Another text",
                            "method": null,
                            "path": null
                        }
                    ],
                    "header": null,
                    "footer": "a footer",
                    "meta": {
                        "auto_select": true
                    }
                }
            };
            assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
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
            const form = parser.loadTemplate('index.pug', data);
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
            let section = parser.loadTemplate('section_example_1.pug', data);
            assert.strictEqual(section instanceof SectionTag, true);

            let response = Response.fromTag(section);
            assert.strictEqual(response instanceof Response, true);

            const expectedJson = {
                "content_type": "menu",
                "content": {
                    "type": "menu",
                    "body": [
                        {
                            "type": "content",
                            "description": "This is pre body",
                            "method": null,
                            "path": null
                        },
                        {
                            "type": "option",
                            "description": "My points: 30",
                            "method": 'GET',
                            "path": "/points/"
                        },
                        {
                            "type": "option",
                            "description": "News & info (10)",
                            "method": 'GET',
                            "path": "/newsInfos/Past"
                        },
                        {
                            "type": "option",
                            "description": "Surveys (2)",
                            "method": 'GET',
                            "path": "/surveys/Past"
                        },
                        {
                            "type": "option",
                            "description": "Classifieds (2)",
                            "method": 'GET',
                            "path": "/classifieds/Past"
                        },
                        {
                            "type": "option",
                            "description": "Profile: 20%",
                            "method": 'GET',
                            "path": "/profile/"
                        }
                    ],
                    "header": "some header",
                    "footer": null,
                    "meta": {
                        "auto_select": true
                    }
                }
            };

            assert.strictEqual(JSON.stringify(response), JSON.stringify(expectedJson));

            section = parser.loadTemplate('section_example_1.ejs', data);
            assert.strictEqual(section instanceof SectionTag, true);

            response = Response.fromTag(section);
            assert.strictEqual(response instanceof Response, true);
        });
    });
});
