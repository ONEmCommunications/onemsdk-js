const assert = require("chai").assert;
const snakecase = require("snakecase-keys");

const tags = require("../src/tag");

const schema = require("../src/index");
const Form = schema.Form,
    Response = schema.Response;

const parser = require("../src/parser");


describe('Menu', function () {
    describe('Menu.fromTag', function () {
        it('should return a navigable Menu', function () {
            const html = '' +
                '<section header="Some header" footer="Some footer" name="some-name" expected-response="option">' +
                '   <ul>' +
                '       <li><a href="/route1" method="POST">Route 1</a></li>' +
                '       <li><a href="/route2">Route 2</a></li>' +
                '       <li>Separator</li>' +
                '       <li><a href="/route3">Route 3</a></li>' +
                '   </ul>' +
                '</section>';
            const rootTag = parser.loadHtml(undefined, html);
            const response = Response.fromTag(rootTag);

            const expected = {
                "content_type": "menu",
                "content": {
                    "type": "menu",
                    "body": [{
                        "type": "option",
                        "description": "Route 1",
                        "method": "POST",
                        "path": "/route1"
                    }, {
                        "type": "option",
                        "description": "Route 2",
                        "method": 'GET',
                        "path": "/route2"
                    }, {
                        "type": "content",
                        "description": "Separator",
                        "method": null,
                        "path": null
                    }, {
                        "type": "option",
                        "description": "Route 3",
                        "method": 'GET',
                        "path": "/route3"
                    }],
                    "header": "Some header",
                    "footer": "Some footer"
                }
            };
            assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
        });

        it('should recognize header/footer as attrs and as children', function () {
            let html = '' +
                '<section header="header attr" footer="footer attr"><p></p>' +
                '</section>';
            let rootTag = parser.loadHtml(undefined, html);
            let response = Response.fromTag(rootTag);
            let expected = {
                "content_type": "menu",
                "content": {
                    "type": "menu",
                    "body": [],
                    "header": "header attr",
                    "footer": "footer attr"
                }
            };
            assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));

            html = '' +
                '<section>' +
                '<header>header child</header>' +
                '<footer>footer child</footer>' +
                '</section>';
            rootTag = parser.loadHtml(undefined, html);
            response = Response.fromTag(rootTag);
            expected = {
                "content_type": "menu",
                "content": {
                    "type": "menu",
                    "body": [],
                    "header": "header child",
                    "footer": "footer child"
                }
            };
            assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
        });

        it('should ignore attr header/footer if they are present in children', function () {
            let html = '' +
                '<section header="header attr" footer="footer attr">' +
                '<header>header child</header>' +
                '</section>';
            let rootTag = parser.loadHtml(undefined, html);
            let response = Response.fromTag(rootTag);
            let expected = {
                "content_type": "menu",
                "content": {
                    "type": "menu",
                    "body": [],
                    "header": "header child",
                    "footer": "footer attr"
                }
            };
            assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
        });

        it('should render the correct response form pug section file', function () {
            const data = {
                NewsInfos: {
                    preBody: 'This is prebody',
                    title: 'This is title',
                    date: 'This is the date',
                    article: 'This is the article'
                }
            };
            let rootTag = parser.loadTemplate('test/section_example_2.pug', data);
            let response = Response.fromTag(rootTag);
            const expected = {
                "content_type": "menu",
                "content": {
                    "type": "menu",
                    "body": [{
                        "type": "content",
                        "description": "This is prebody",
                        "method": null,
                        "path": null
                    }, {
                        "type": "content",
                        "description": "Title: This is title",
                        "method": null,
                        "path": null
                    }, {
                        "type": "content",
                        "description": "Date: This is the date",
                        "method": null,
                        "path": null
                    }, {
                        "type": "content",
                        "description": "Article: This is the article",
                        "method": null,
                        "path": null
                    }],
                    "header": null,
                    "footer": null
                }
            };
            assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
        })
    });
});

describe('Form', function () {
    describe('Form.fromTag', function () {
        it('should return a Form() object from html form', function () {
            const html = '<form path="/route">' +
                '<section name="name" expected-response="exp">' +
                '<p>This is paragraph</p>' +
                '</section>' +
                '</form>';
            const formTag = parser.loadHtml(undefined, html);
            const form = Form.fromTag(formTag);
            assert.strictEqual(form instanceof Form, true);
        });

        it('should return expected Response from html file form', function () {
            const rootTag = parser.loadHtml('test/formBig.html', undefined);
            const response = Response.fromTag(rootTag);
            const expected = {
                "content_type": "form",
                "content": {
                    "type": "form",
                    "body": [
                        {
                            "type": "string",
                            "name": "step1",
                            "description": "What is your name?",
                            "header": "SETUP NAME",
                            "footer": "Reply with text"
                        }, {
                            "type": "form-menu",
                            "body": [{
                                "type": "content",
                                "description": "Choose your city:",
                                "value": null
                            }, {
                                "type": "content",
                                "description": "UK",
                                "value": null
                            }, {
                                "type": "option",
                                "description": "London",
                                "value": "london"
                            }, {
                                "type": "option",
                                "description": "Manchester",
                                "value": "manchester"
                            }, {
                                "type": "content",
                                "description": "FR",
                                "value": null
                            }, {
                                "type": "option",
                                "description": "Paris",
                                "value": "paris"
                            }, {
                                "type": "option",
                                "description": "Nice",
                                "value": "nice"
                            }],
                            "header": "SETUP CITY",
                            "footer": "Reply A-D",
                        }],
                    "method": "POST",
                    "path": "/route",
                    "header": "Form header",
                    "footer": "Form footer",
                    "meta": {
                        "completion_status_show": null,
                        "completion_status_in_header": null,
                        "confirmation_needed": null
                    }
                }
            };
            assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
        });
    });
});

describe('Response', function () {
    it('should return the correct Response object', function () {

        const html = '<form header="Form header" confirmation-needed="true" method="PATCH" path="/route">' +
            '<section name="first-step" expected-response="option">' +
            '   <ul>' +
            '       <li value="first">First item</li>' +
            '       <li value="second">Second item</li>' +
            '   </ul>' +
            '</section>' +
            '<section name="second-step" expected-response="string">' +
            '   <label>A question</label>' +
            '   <input/>' +
            '</section></form>';

        const formTag = parser.loadHtml(undefined, html);
        const response = Response.fromTag(formTag, 'alabama');
        const expected = {
            "content_type": "form",
            "content": {
                "type": "form",
                "body": [
                    {
                        "type": "form-menu",
                        "body": [{
                            "type": "option",
                            "description": "First item",
                            "value": "first"
                        }, {
                            "type": "option",
                            "description": "Second item",
                            "value": "second"
                        }],
                        "header": null,
                        "footer": null,
                    }, {
                        "type": "string",
                        "name": "second-step",
                        "description": "A question",
                        "header": null,
                        "footer": null
                    }
                ],
                "method": "PATCH",
                "path": "/route",
                "header": "Form header",
                "footer": null,
                "meta": {
                    "completion_status_show": null,
                    "completion_status_in_header": null,
                    "confirmation_needed": true
                }
            }
        };
        assert.strictEqual(response instanceof Response, true);
        assert.strictEqual(JSON.stringify(response), JSON.stringify(snakecase(expected)));
    })
});