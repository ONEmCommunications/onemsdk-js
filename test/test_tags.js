const assert = require("chai").assert;

const tags = require("../src/tag");
const FormTag = tags.FormTag,
    PTag = tags.PTag,
    ATag = tags.ATag,
    SectionTag = tags.SectionTag,
    HeaderTag = tags.HeaderTag,
    FooterTag = tags.FooterTag,
    BrTag = tags.BrTag,
    InputTag = tags.InputTag,
    LabelTag = tags.LabelTag,
    UlTag = tags.UlTag,
    LiTag = tags.LiTag;


const parser = require("node-html-parser");

describe('Test tags', function () {

    describe('FormTag', function () {
        describe('FormTag.fromNode()', function () {
            it('should return a FormTag() object', function () {
                let html = '<form action="/route">' +
                    '<section name="name">' +
                    '<p>This is paragraph</p>' +
                    '</section>' +
                    '</form>';
                const parsedHtml = parser.parse(html);
                const form = FormTag.fromNode(parsedHtml.childNodes[0]);
                assert.strictEqual(form instanceof FormTag, true);
            });

            it('should work with camelCase and dash attributes', function () {
                const html = '<form action="/route" completionStatusShow="true" confirmation-needed="false">' +
                    '<section name="name"><p>Some content</p></section></form>';
                const parsedHtml = parser.parse(html);
                const form = FormTag.fromNode(parsedHtml.childNodes[0]);

                assert.strictEqual(form.attrs.completionStatusShow, true);
                assert.strictEqual(form.attrs.confirmationNeeded, true);
                assert.strictEqual(form.attrs.completionStatusInHeader, false);
            });

            it('should evaluate to true the present attributes, and to false the absent ones', function () {
                const html = '<form action="/route" completionStatusShow="non-boolean" confirmation-needed="True">' +
                    '<section name="name"><p>Some content</p></section></form>';
                const parsedHtml = parser.parse(html);
                const form = FormTag.fromNode(parsedHtml.childNodes[0]);

                assert.strictEqual(form.attrs.completionStatusShow, true);
                assert.strictEqual(form.attrs.confirmationNeeded, true);
                assert.strictEqual(form.attrs.completionStatusInHeader, false);
            });

            it('should throw error for other tags', function () {
                const html = '<section name="name"><p>Para Para Paragraph</p></section>';
                const parsedHtml = parser.parse(html);

                function iThrow() {
                    return FormTag.fromNode(parsedHtml.childNodes[0]);
                }

                assert.throws(iThrow, Error, 'Expected <form>, received <section>');
            });

            it('should throw error for other children than section', function () {
                const html = '<form action="/route"><ul><li>Para Para Paragraph</li></ul></form>';
                const parsedHtml = parser.parse(html);

                function iThrow() {
                    return FormTag.fromNode(parsedHtml.childNodes[0]);
                }

                assert.throws(iThrow, Error, '<form> can have only <section> children');
            });

            it('should not work without children', function () {
                const html = '<form action="/route"></form>';
                const parsedHtml = parser.parse(html);

                function iThrow() {
                    return FormTag.fromNode(parsedHtml.childNodes[0]);
                }

                assert.throws(iThrow, Error, '<form> must have at least 1 child');
            });

            it('should throw an error if the section is not named', function () {
                const html = '<form action="/route"><section><p></p></section></form>';
                const parsedHtml = parser.parse(html);

                function iThrow() {
                    return FormTag.fromNode(parsedHtml.childNodes[0]);
                }

                assert.throws(iThrow, Error, '<form> can contain only named <section> tags. ' +
                    'Please add a unique "name" attribute in each form  section.')
            });
        })
    });

    describe('SectionTag', function () {
        describe('SectionTag.fromNode()', function () {
            it('should not work without children', function () {
                const html = '<section name="name"></section>';
                const parsedHtml = parser.parse(html);

                function iThrow() {
                    return SectionTag.fromNode(parsedHtml.childNodes[0]);
                }

                assert.throws(iThrow, Error, '<section> must have at least 1 child');
            });

            it('should not work with some <li> children', function () {
                const html = '<section name="name"><p>Para</p><li>li child</li></section>';
                const parsedHtml = parser.parse(html);

                function iThrow() {
                    return SectionTag.fromNode(parsedHtml.childNodes[0]);
                }

                assert.throws(iThrow, Error, '<section> cannot have <li> child');
            });

            it('should work with ul, p, br, input, label', function () {
                const html = '<section name="name"><p>Para</p><br/><ul><li>li</li></ul><input name="some-name"/><label>label</label></section>';
                const parsedHtml = parser.parse(html);
                const sectionTag = SectionTag.fromNode(parsedHtml.childNodes[0]);
                assert.equal(sectionTag instanceof SectionTag, true);
            });

            it('should parse attributes correctly', function () {
                const html = '' +
                    '<section name="a-name" header="a header" footer="a footer">' +
                    '<p>Para</p>' +
                    '</section>';
                const parsedHtml = parser.parse(html);
                const sectionTag = SectionTag.fromNode(parsedHtml.childNodes[0]);

                assert.strictEqual(sectionTag.attrs.name, 'a-name');
                assert.strictEqual(sectionTag.attrs.header, 'a header');
                assert.strictEqual(sectionTag.attrs.footer, 'a footer');
            });

            it('should render the children correctly', function () {
                const expected = 'This is just a text\n' +
                    'This is paragraph\n' +
                    '\n' +
                    'An item\n' +
                    'Another item\n' +
                    'This is another text';
                const html = '<section name="name">' +
                    'This is just a text' +
                    '<p>This is paragraph</p>' +
                    '<br/><input/>' +
                    '<ul>' +
                    '<li>An item</li>' +
                    '<li><a href="/route">Another item</a></li>' +
                    '</ul>This is another text' +
                    '</section>';
                const parsedHtml = parser.parse(html);
                const sectionTag = SectionTag.fromNode(parsedHtml.childNodes[0]);
                const rendered = sectionTag.toString();
                assert.strictEqual(rendered, expected);
            });
        });
    });

    describe('PTag', function () {
        describe('PTag.fromNode', function () {
            it('works with 1 text child', function () {
                const html = "<p>Paragraph</p>";
                const parsedHtml = parser.parse(html);
                const ptag = PTag.fromNode(parsedHtml.childNodes[0]);
                assert.strictEqual(ptag instanceof PTag, true);
            });

            it('should work with no children', function () {
                const html = "<p></p>";
                const parsedHTML = parser.parse(html);
                const pTag = PTag.fromNode(parsedHTML.childNodes[0]);
                assert.strictEqual(pTag instanceof PTag, true);
            });

            it('should not work with more than 1 child', function () {
                const html = "<p><br/>Paragraph</p>";
                const parsedHtml = parser.parse(html);

                function iThrow() {
                    return PTag.fromNode(parsedHtml.childNodes[0]);
                }

                assert.throws(iThrow, Error, '<p> cannot have more than 1 child')
            });

            it('should not work with non-text child', function () {
                const html = "<p><br/></p>";
                const parsedHtml = parser.parse(html);

                function iThrow() {
                    return PTag.fromNode(parsedHtml.childNodes[0]);
                }

                assert.throws(iThrow, Error, '<p> child must be text');
            });
        })
    });

    describe('ATag', function () {
        describe('ATag.fromNode', function () {
            it('works with 1 text child', function () {
                const html = "<a href='/route'>Some text</a>";
                const parsedHtml = parser.parse(html);
                const atag = ATag.fromNode(parsedHtml.childNodes[0]);
                assert.strictEqual(atag instanceof ATag, true);
            });

            it('should not work with more than 1 child', function () {
                const html = "<a href='/route'><br/>Paragraph</a>";
                const parsedHtml = parser.parse(html);

                function iThrow() {
                    return ATag.fromNode(parsedHtml.childNodes[0]);
                }

                assert.throws(iThrow, Error, '<a> must have 1 text child')
            });

            it('should not work with non text node', function () {
                const html = "<a href='/route'><br/></a>";
                const parsedHtml = parser.parse(html);

                function iThrow() {
                    return ATag.fromNode(parsedHtml.childNodes[0]);
                }

                assert.throws(iThrow, Error, '<a> must have 1 text child');
            });

            it('should not work without href', function () {
                const html = "<a><br/></a>";
                const parsedHtml = parser.parse(html);

                function iThrow() {
                    return ATag.fromNode(parsedHtml.childNodes[0]);
                }

                assert.throws(iThrow, Error, '<a> must contain href attribute');
            });
        })
    });

    describe('HeaderTag', function () {
        describe('HeaderTag.fromNode()', function () {
            it('should not work with many children', function () {
                const html = '<header><p>First child</p> Second child </header>';
                const parsedHtml = parser.parse(html);

                function iThrow() {
                    return HeaderTag.fromNode(parsedHtml.childNodes[0]);
                }

                assert.throws(iThrow, Error, '<header> must have 1 text child');
            });
            it('should not work with non-text child', function () {
                const html = '<header><br/></header>';
                const parsedHtml = parser.parse(html);

                function iThrow() {
                    return HeaderTag.fromNode(parsedHtml.childNodes[0]);
                }

                assert.throws(iThrow, Error, '<header> must have 1 text child');
            });
        });
    });

    describe('FooterTag', function () {
        describe('FooterTag.fromNode()', function () {
            it('should not work with many children', function () {
                const html = '<footer>Second child <br/> </footer>';
                const parsedHtml = parser.parse(html);

                function iThrow() {
                    return FooterTag.fromNode(parsedHtml.childNodes[0]);
                }

                assert.throws(iThrow, Error, '<footer> must have 1 text child');
            });

            it('should not work with non-text child', function () {
                const html = '<footer><br/></footer>';
                const parsedHtml = parser.parse(html);

                function iThrow() {
                    return FooterTag.fromNode(parsedHtml.childNodes[0]);
                }

                assert.throws(iThrow, Error, '<footer> must have 1 text child');
            });
        });
    });
});
