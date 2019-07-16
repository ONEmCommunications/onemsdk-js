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

describe('FormTag', function () {
    describe('FormTag.fromNode()', function () {
        it('should return a FormTag() object', function () {
            let html = '<form>' +
                '<section name="name" expected-response="exp">' +
                '<p>This is paragraph</p>' +
                '</section>' +
                '</form>';
            const parsedHtml = parser.parse(html);
            const form = FormTag.fromNode(parsedHtml.childNodes[0]);
            assert.strictEqual(form instanceof FormTag, true);
        });

        it('should work with camelCase and dash attributes', function () {
            const html = '<form completionStatusShow="true" confirmation-needed="true">' +
                '<section name="name" expected-response="exp"><p>Some content</p></section></form>';
            const parsedHtml = parser.parse(html);
            const form = FormTag.fromNode(parsedHtml.childNodes[0]);

            assert.strictEqual(true, form.attrs.completionStatusShow);
            assert.strictEqual(true, form.attrs.confirmationNeeded);
        });

        it('should turn to null non-boolean attributes or missing ones', function () {
            const html = '<form completionStatusShow="non-boolean" confirmation-needed="True">' +
                '<section name="name" expected-response="exp"><p>Some content</p></section></form>';
            const parsedHtml = parser.parse(html);
            const form = FormTag.fromNode(parsedHtml.childNodes[0]);

            assert.strictEqual(null, form.attrs.completionStatusShow);
            assert.strictEqual(null, form.attrs.confirmationNeeded);
            assert.strictEqual(null, form.attrs.completionStatusInHeader);
        });

        it('should throw error for other tags', function () {
            const html = '<section name="name" expected-response="exp"><p>Para Para Paragraph</p></section>';
            const parsedHtml = parser.parse(html);

            function iThrow() {
                return FormTag.fromNode(parsedHtml.childNodes[0]);
            }

            assert.throws(iThrow, Error, 'Expected <form>, received <section>');
        });

        it('should throw error for other children than section', function () {
            const html = "<form><ul><li>Para Para Paragraph</li></ul></form>";
            const parsedHtml = parser.parse(html);

            function iThrow() {
                return FormTag.fromNode(parsedHtml.childNodes[0]);
            }

            assert.throws(iThrow, Error, '<form> can have only <section> children');
        });

        it('should not work without children', function () {
            const html = "<form></form>";
            const parsedHtml = parser.parse(html);

            function iThrow() {
                return FormTag.fromNode(parsedHtml.childNodes[0]);
            }

            assert.throws(iThrow, Error, '<form> must have at least 1 child');
        });
    })
});

describe('SectionTag', function () {
    describe('SectionTag.fromNode()', function () {
        it('should not work without children', function () {
            const html = '<section name="name" expected-response="exp"></section>';
            const parsedHtml = parser.parse(html);

            function iThrow() {
                return SectionTag.fromNode(parsedHtml.childNodes[0]);
            }

            assert.throws(iThrow, Error, '<section> must have at least 1 child');
        });

        it('should not work with some <li> children', function () {
            const html = '<section name="name" expected-response="exp"><p>Para</p><li>li child</li></section>';
            const parsedHtml = parser.parse(html);

            function iThrow() {
                return SectionTag.fromNode(parsedHtml.childNodes[0]);
            }

            assert.throws(iThrow, Error, '<section> cannot have <li> child');
        });

        it('should work with ul, p, br, input, label', function () {
            const html = '<section name="name" expected-response="exp"><p>Para</p><br/><ul><li>li</li></ul><input name="some-name"/><label>label</label></section>';
            const parsedHtml = parser.parse(html);
            const sectionTag = SectionTag.fromNode(parsedHtml.childNodes[0]);
            assert.equal(sectionTag instanceof SectionTag, true);
        });

        it('should not work without mandatory attributes', function () {
            const html = '<section><p>Para</p></section>';
            const parsedHtml = parser.parse(html);

            function iThrow() {
                return SectionTag.fromNode(parsedHtml.childNodes[0]);
            }

            assert.throws(iThrow, Error, '("name", "expectedResponse") attributes are mandatory for <section>');
        });

        it('should render the children correctly', function () {
            const expected = 'This is paragraph\n\nAn item\nAnother item\n';
            const html = '<section name="name" expected-response="exp">' +
                '<p>This is paragraph</p>' +
                '<br/><input/>' +
                '<ul>' +
                '<li>An item</li>' +
                '<li><a href="/route">Another item</a></li>' +
                '</ul>' +
                '</section>';
            const parsedHtml = parser.parse(html);
            const sectionTag = SectionTag.fromNode(parsedHtml.childNodes[0]);
            const rendered = sectionTag.toString();
            assert.strictEqual(expected, rendered);
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

        it('should not work with more than 1 child', function () {
            const html = "<p><br/>Paragraph</p>";
            const parsedHtml = parser.parse(html);

            function iThrow() {
                return PTag.fromNode(parsedHtml.childNodes[0]);
            }

            assert.throws(iThrow, Error, '<p> must have 1 text child')
        });

        it('should not work with non text node', function () {
            const html = "<p><br/></p>";
            const parsedHtml = parser.parse(html);

            function iThrow() {
                return PTag.fromNode(parsedHtml.childNodes[0]);
            }

            assert.throws(iThrow, Error, '<p> must have 1 text child')
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