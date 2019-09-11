const assert = require("chai").assert;
const snakecase = require("snakecase-keys");

const tags = require("../src/tag");

const schema = require("../src/index");
const Form = schema.Form,
    Response = schema.Response;

const parser = require("../src/parser");
const config = require("../src/config");

describe('Test schema', function () {
    before(function () {
        config.setStaticDir('test/statics');
    });

    describe('Menu', function () {

        describe('Menu.fromTag', function () {
            it('should return a navigable Menu', function () {
                const html = '' +
                    '<section header="Some header" footer="Some footer" name="some-name" auto-select>' +
                    '   <ul>' +
                    '       <li text-search="route1 route 1"><a href="/route1" method="POST">Route 1</a></li>' +
                    '       <li text-search="route2 route 2"><a href="/route2">Route 2</a></li>' +
                    '       <li>Separator</li>' +
                    '       <li text-search="route 3 route3"><a href="/route3">Route 3</a></li>' +
                    '   </ul>' +
                    '</section>';
                const rootTag = parser.loadHtml(undefined, html);
                const response = Response.fromTag(rootTag);

                const expected = {
                    "content_type": "menu",
                    "content": {
                        "type": "menu",
                        "body": [
                            {
                                "type": "option",
                                "description": "Route 1",
                                "text_search": "route1 route 1",
                                "method": "POST",
                                "path": "/route1"
                            },
                            {
                                "type": "option",
                                "description": "Route 2",
                                "text_search": "route2 route 2",
                                "method": 'GET',
                                "path": "/route2"
                            },
                            {
                                "type": "content",
                                "description": "Separator",
                                "text_search": null,
                                "method": null,
                                "path": null
                            },
                            {
                                "type": "option",
                                "description": "Route 3",
                                "text_search": "route 3 route3",
                                "method": 'GET',
                                "path": "/route3"
                            }
                        ],
                        "header": "Some header",
                        "footer": "Some footer",
                        "meta": {
                            "auto_select": true
                        }
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
                        "footer": "footer attr",
                        "meta": {
                            "auto_select": false
                        }
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
                        "footer": "footer child",
                        "meta": {
                            "auto_select": false
                        }
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
                        "footer": "footer attr",
                        "meta": {
                            "auto_select": false
                        }
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
                let rootTag = parser.loadTemplate('section_example_2.pug', data);
                let response = Response.fromTag(rootTag);
                const expected = {
                    "content_type": "menu",
                    "content": {
                        "type": "menu",
                        "body": [
                            {
                                "type": "content",
                                "description": "This is prebody",
                                "text_search": null,
                                "method": null,
                                "path": null
                            },
                            {
                                "type": "content",
                                "description": "Title: This is title",
                                "text_search": null,
                                "method": null,
                                "path": null
                            },
                            {
                                "type": "content",
                                "description": "Date: This is the date",
                                "text_search": null,
                                "method": null,
                                "path": null
                            },
                            {
                                "type": "content",
                                "description": "Article: This is the article",
                                "text_search": null,
                                "method": null,
                                "path": null
                            }
                        ],
                        "header": null,
                        "footer": null,
                        "meta": {
                            "auto_select": true
                        }
                    }
                };
                assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
            })
        });
    });

    describe('Form', function () {
        describe('Form.fromTag', function () {
            it('should return a Form() object from html form', function () {
                const html = '' +
                    '<form action="/route">' +
                    '   <section name="name">' +
                    '       <p>This is paragraph</p>' +
                    '       <input type="text"/>' +
                    '   </section>' +
                    '</form>';
                const formTag = parser.loadHtml(undefined, html);
                const form = Form.fromTag(formTag);
                assert.strictEqual(form instanceof Form, true);
            });

            it('should return expected Response from html file form', function () {
                const rootTag = parser.loadHtml('formBig.html', undefined);
                const response = Response.fromTag(rootTag);
                const expected = {
                    "content_type": "form",
                    "content": {
                        "type": "form",
                        "body": [
                            {
                                "type": "float",
                                "name": "step1",
                                "description": "What is your height?",
                                "header": "SETUP HEIGHT",
                                "footer": "Reply with text",
                                "body": null,
                                "value": null,
                                "chunking_footer": null,
                                "confirmation_label": null,
                                "min_length": null,
                                "min_length_error": null,
                                "max_length": null,
                                "max_length_error": null,
                                "min_value": 0.5,
                                "min_value_error": "Are you a baby?",
                                "max_value": 2.5,
                                "max_value_error": "Too high",
                                "meta": {
                                    "auto_select": false,
                                    "multi_select": false,
                                    "numbered": false
                                },
                                "method": null,
                                "required": true,
                                "status_exclude": false,
                                "status_prepend": false,
                                "url": null,
                                "validate_type_error": null,
                                "validate_type_error_footer": null,
                                "validate_url": null
                            },
                            {
                                "type": "form-menu",
                                "name": "step2",
                                "description": "Choose your city:\nUK\nLondon\nManchester\nFR\nParis\nNice",
                                "header": "SETUP CITY",
                                "footer": "Reply A-D",
                                "body": [
                                    {
                                        "type": "option",
                                        "description": "UK",
                                        "value": null,
                                        "text_search": null
                                    },
                                    {
                                        "type": "option",
                                        "description": "London",
                                        "value": "london",
                                        "text_search": null
                                    },
                                    {
                                        "type": "option",
                                        "description": "Manchester",
                                        "value": "manchester",
                                        "text_search": null
                                    },
                                    {
                                        "type": "option",
                                        "description": "FR",
                                        "value": null,
                                        "text_search": null
                                    },
                                    {
                                        "type": "option",
                                        "description": "Paris",
                                        "value": "paris",
                                        "text_search": null
                                    },
                                    {
                                        "type": "option",
                                        "description": "Nice",
                                        "value": "nice",
                                        "text_search": null
                                    }
                                ],
                                "value": null,
                                "chunking_footer": null,
                                "confirmation_label": null,
                                "min_length": null,
                                "min_length_error": null,
                                "max_length": null,
                                "max_length_error": null,
                                "min_value": null,
                                "min_value_error": null,
                                "max_value": null,
                                "max_value_error": null,
                                "meta": {
                                    "auto_select": true,
                                    "multi_select": false,
                                    "numbered": true
                                },
                                "method": null,
                                "required": true,
                                "status_exclude": false,
                                "status_prepend": false,
                                "url": null,
                                "validate_type_error": null,
                                "validate_type_error_footer": null,
                                "validate_url": null
                            }
                        ],
                        "method": "POST",
                        "path": "/route",
                        "header": "Form header",
                        "footer": "Form footer",
                        "meta": {
                            "completion_status_show": false,
                            "completion_status_in_header": true,
                            "confirmation_needed": false
                        }
                    }
                };
                assert.strictEqual(JSON.stringify(response), JSON.stringify(expected));
            });
        });
    });

    describe('Response', function () {
        it('should return the correct Response object', function () {

            const html = '<form header="Form header" confirmation-needed method="PATCH" action="/route">' +
                '<section name="step1" numbered required auto-select>' +
                '   <ul>' +
                '       <li value="first" text-search="Context for first item">First item</li>' +
                '       <li value="second">Second item</li>' +
                '   </ul>' +
                '</section>' +
                '<section name="step2" method="POST" confirmation-label="confirmation label" required>' +
                '   <label>A question</label>' +
                '   <input type="number" step="1" />' +
                '</section>' +
                '</form>';

            const formTag = parser.loadHtml(undefined, html);
            const response = Response.fromTag(formTag, 'alabama');
            const expected = {
                "content_type": "form",
                "content": {
                    "type": "form",
                    "body": [
                        {
                            "type": "form-menu",
                            "name": "step1",
                            "description": "First item\nSecond item",
                            "header": null,
                            "footer": null,
                            "body": [
                                {
                                    "type": "option",
                                    "description": "First item",
                                    "value": "first",
                                    "text_search": "Context for first item"
                                },
                                {
                                    "type": "option",
                                    "description": "Second item",
                                    "value": "second",
                                    "text_search": null
                                }
                            ],
                            "value": null,
                            "chunking_footer": null,
                            "confirmation_label": null,
                            "min_length": null,
                            "min_length_error": null,
                            "max_length": null,
                            "max_length_error": null,
                            "min_value": null,
                            "min_value_error": null,
                            "max_value": null,
                            "max_value_error": null,
                            "meta": {
                                "auto_select": true,
                                "multi_select": false,
                                "numbered": true
                            },
                            "method": null,
                            "required": true,
                            "status_exclude": false,
                            "status_prepend": false,
                            "url": null,
                            "validate_type_error": null,
                            "validate_type_error_footer": null,
                            "validate_url": null
                        },
                        {
                            "type": "int",
                            "name": "step2",
                            "description": "A question",
                            "header": null,
                            "footer": null,
                            "body": null,
                            "value": null,
                            "chunking_footer": null,
                            "confirmation_label": "confirmation label",
                            "min_length": null,
                            "min_length_error": null,
                            "max_length": null,
                            "max_length_error": null,
                            "min_value": null,
                            "min_value_error": null,
                            "max_value": null,
                            "max_value_error": null,
                            "meta": {
                                "auto_select": false,
                                "multi_select": false,
                                "numbered": false
                            },
                            "method": "POST",
                            "required": true,
                            "status_exclude": false,
                            "status_prepend": false,
                            "url": null,
                            "validate_type_error": null,
                            "validate_type_error_footer": null,
                            "validate_url": null
                        }
                    ],
                    "method": "PATCH",
                    "path": "/route",
                    "header": "Form header",
                    "footer": null,
                    "meta": {
                        "completion_status_show": false,
                        "completion_status_in_header": false,
                        "confirmation_needed": true
                    }
                }
            };
            assert.strictEqual(response instanceof Response, true);
            assert.strictEqual(JSON.stringify(response), JSON.stringify(snakecase(expected)));
        })
    });
});