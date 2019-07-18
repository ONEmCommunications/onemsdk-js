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
    });
});

describe('Response', function () {
    it('should return the correct Response object', function () {
        const expected = {
            contentType: "form",
            content: {
                type: "form",
                body: [
                    {
                        type: "form-menu",
                        body: [
                            {
                                type: "option",
                                description: "First item",
                                value: "first"
                            }, {
                                type: "option",
                                description: "Second item",
                                value: "second"
                            }]
                    }, {
                        type: "string",
                        name: "second-step",
                        description: "A question",
                        header: null,
                        footer: null
                    }
                ],
                method: "PATCH",
                path: "/route",
                header: "Form header",
                footer: null,
                meta: {
                    completionStatusShow: null,
                    completionStatusInHeader: null,
                    confirmationNeeded: true
                }
            }
        };

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
        assert.strictEqual(response instanceof Response, true);
        assert.strictEqual(JSON.stringify(response), JSON.stringify(snakecase(expected)));
    })
});