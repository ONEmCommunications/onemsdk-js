const parser = require('node-html-parser');

/**
 * @typedef Tag
 * @property {Array<Tag> | undefined} children
 * @property {Object | undefined} attrs
 * @property {String} tagName
 */

/**
 * @typedef HeaderTag
 * @extends Tag
 * @property {Array<String>} children
 * @property {undefined} attrs
 */

/**
 * @typedef FooterTag
 * @extends Tag
 * @property {Array<String>} children
 * @property {undefined} attrs
 */

/**
 * @typedef LabelTag
 * @extends Tag
 * @property {Array<String>} children
 * @property {undefined} attrs
 */

/**
 * @typedef InputTag
 * @extends Tag
 * @property {undefined} children
 * @property {InputTagAttrs} attrs
 */

/**
 * @typedef ATag
 * @extends Tag
 * @property {Array<String>} children
 * @property {ATagAttrs} attrs
 */

/**
 * @typedef PTag
 * @extends Tag
 * @property {Array<String>} children
 * @property {undefined} attrs
 */

/**
 * @typedef BrTag
 * @extends Tag
 * @property {undefined} children
 * @property {undefined} attrs
 */

/**
 * @typedef LiTag
 * @extends Tag
 * @property {Array<ATag | String>} children
 * @property {LiTagAttrs} attrs
 */

/**
 * @typedef UlTag
 * @extends Tag
 * @property {Array<LiTag>} children
 * @property {undefined} attrs
 */

/**
 * @typedef SectionTag
 * @extends Tag
 * @property {Array<HeaderTag | FooterTag | UlTag | PTag | BrTag | InputTag | LabelTag>} children
 * @property {undefined} attrs
 */

/**
 * @typedef FormTag
 * @extends Tag
 * @property {Array<SectionTag>} children
 * @property {undefined} attrs
 */

/**
 * @type {{br: *, p: *, a: *, input: *, form: *, footer: *, ul: *, header: *, section: *, label: *, li: *}}
 */
const tagClsMap = {
    a: ATag,
    br: BrTag,
    footer: FooterTag,
    form: FormTag,
    header: HeaderTag,
    input: InputTag,
    label: LabelTag,
    li: LiTag,
    p: PTag,
    section: SectionTag,
    ul: UlTag,
};

function getTagCls(tagName) {
    return tagClsMap[tagName];
}

/**
 * Instantiates a Tag
 * @param {Array<Tag> | undefined} children
 * @param {Object | undefined} attrs
 * @constructor
 */
function Tag(children, attrs) {
    this.children = children;
    this.attrs = attrs;
}

Tag.tagName = undefined;

/**
 * @param {HTMLElement} node
 * @returns {FormTag | SectionTag | UlTag | LiTag | ATag | PTag | BrTag | HeaderTag | FooterTag | InputTag | LabelTag}
 */
Tag.fromNode = function (node) {
    if (this.tagName !== node.tagName) {
        throw Error(`Expected <${this.tagName}>, received <${node.tagName}>`)
    }

    const attrs = this.getAttributes(node);

    let children = [];

    node.childNodes.forEach(function (childNode) {

        const childCls = getTagCls(childNode.tagName);

        if (childNode instanceof parser.TextNode) {
            children.push(new String(childNode.text))
        } else {
            children.push(childCls.fromNode(childNode));
        }
    });

    return new this(children, attrs);
};

/**
 * Returns the attributes specific to a certain tag
 * @param {HTMLElement} node
 * @returns {Object | undefined}
 */
Tag.getAttributes = function (node) {
    return undefined;
};


function HeaderTag(children) {
    if (children.length !== 1 || !(children[0] instanceof String)) {
        throw Error('<header> must have 1 text child')
    }
    this.children = children;
}

HeaderTag.__proto__ = Tag;
HeaderTag.tagName = 'header';


function FooterTag(children) {
    if (children.length !== 1 || !(children[0] instanceof String)) {
        throw Error('<footer> must have 1 text child')
    }
    this.children = children;
}

FooterTag.__proto__ = Tag;
FooterTag.tagName = 'footer';


/**
 * @constructor
 */
function BrTag() {
}

BrTag.__proto__ = Tag;
BrTag.tagName = 'br';


/**
 * @param {Array<String>} children
 * @constructor
 */
function PTag(children) {
    if (children.length !== 1 || !(children[0] instanceof String)) {
        throw Error('<p> must have 1 text child')
    }
    this.children = children;
}

PTag.__proto__ = Tag;
PTag.tagName = 'p';


/**
 * @param {String} href
 * @constructor
 */
function ATagAttrs(href) {
    if (!href) {
        throw Error('<a> must contain href attribute');
    }
    this.href = href;
}

/**
 * @param {Array<String>} children
 * @param {ATagAttrs} attrs
 * @constructor
 */
function ATag(children, attrs) {
    if (children.length !== 1 || !(children[0] instanceof String)) {
        throw Error('<a> must have 1 text child')
    }
    this.children = children;
    this.attrs = attrs;
}

ATag.__proto__ = Tag;
ATag.tagName = 'a';


/**
 *
 * @param {HTMLAnchorElement} node
 */
ATag.getAttributes = function (node) {
    return new ATagAttrs(node.attributes.href);
};


/**
 * @param {String} data
 * @constructor
 */
function LiTagAttrs(data) {
    this.data = data;
}

/**
 * @param {Array<ATag | String>} children
 * @param {LiTagAttrs} attrs
 * @constructor
 */
function LiTag(children, attrs) {
    if (
        children.length !== 1 ||
        !(children[0] instanceof ATag || children[0] instanceof String)
    ) {
        throw Error('<li> must have 1 child (<a> or text)')
    }
    this.children = children;
    this.attrs = attrs;
}

LiTag.__proto__ = Tag;
LiTag.tagName = 'li';


/**
 * @param {Array<LiTag>} children
 * @constructor
 */
function UlTag(children) {
    if (children.length === 0) {
        throw Error('<ul> must have at least 1 child')
    }

    children.forEach(function (child) {
        if (!(child instanceof LiTag)) {
            throw Error('<ul> can have only <li> children')
        }
    });

    this.children = children;
}

UlTag.__proto__ = Tag;
UlTag.tagName = 'ul';


/**
 *
 * @param {String} name
 * @param {('text' | 'date' | 'datetime')} type
 * @constructor
 */
function InputTagAttrs(name, type) {
    this.name = name;
    this.type = type;
}

/**
 * @param {InputTagAttrs} attrs
 * @constructor
 */
function InputTag(attrs) {
    this.children = undefined;
}

InputTag.__proto__ = Tag;
InputTag.tagName = 'input';

/**
 * @param {HTMLInputElement} node
 * @returns {InputTagAttrs}
 */
InputTag.getAttributes = function (node) {
    return new InputTagAttrs(node.attributes.name, node.attributes.type);
};


function LabelTag(children) {
    this.children = children;
    this.attrs = undefined;
}

LabelTag.__proto__ = Tag;
LabelTag.tagName = 'label';


/**
 * Instantiates a new SectionTagAttrs
 * @param {string} name
 * @param {('string', 'date', 'datetime')} expectedResponse
 * @param {string|undefined} header
 * @param {string|undefined} footer
 * @constructor
 */
function SectionTagAttrs(name, expectedResponse, header, footer) {
    if (!name || !expectedResponse) {
        throw Error('("name", "expectedResponse") attributes are mandatory for <section>');
    }
    this.name = name;
    this.expectedResponse = expectedResponse;
    this.header = header || null;
    this.footer = footer || null;
}

/**
 * @param {Array<PTag | BrTag | UlTag | LabelTag | HeaderTag | FooterTag | InputTag>} children
 * @constructor
 */
function SectionTag(children) {
    if (children.length === 0) {
        throw Error('<section> must have at least 1 child');
    }

    children.forEach(function (child) {
        switch (child.constructor.tagName) {
            case 'p':
            case 'br':
            case 'ul':
            case 'input':
            case 'label':
            case 'header':
            case 'footer':
                break;
            default:
                throw Error(`<section> cannot have <${child.constructor.tagName}> child`);
        }
    });

    this.children = children;
    this.attrs = undefined;
}

SectionTag.__proto__ = Tag;
SectionTag.tagName = 'section';

SectionTag.getAttributes = function (node) {
    let expectedResponse;
    if (node.attributes.expectedResponse !== undefined) {
        expectedResponse = node.attributes.expectedResponse;
    } else if (node.attributes['expected-response'] !== undefined) {
        expectedResponse = node.attributes['expected-response'];
    }
    return new SectionTagAttrs(
        node.attributes.name,
        expectedResponse,
        node.attributes.header,
        node.attributes.footer
    );
};

/**
 * Instantiates a new FormTagAttrs
 * @param {string} path
 * @param {string} method
 * @param {string|undefined} header
 * @param {string|undefined} footer
 * @param {boolean|undefined} completionStatusShow
 * @param {boolean|undefined} completionStatusInHeader
 * @param {boolean|undefined} confirmationNeeded
 * @constructor
 */
function FormTagAttrs(path, method, header, footer, completionStatusShow,
                      completionStatusInHeader, confirmationNeeded) {
    this.path = path;
    this.method = method;
    this.header = header || null;
    this.footer = footer || null;
    this.completionStatusShow = completionStatusShow || null;
    this.completionStatusInHeader = completionStatusInHeader || null;
    this.confirmationNeeded = confirmationNeeded || null;
}

/**
 * @param {Array<SectionTag>} children
 * @param {FormTagAttrs} attrs
 * @constructor
 * */
function FormTag(children, attrs) {
    if (children.length === 0) {
        throw Error('<form> must have at least 1 child');
    }

    children.forEach(function (child) {
        if (!(child instanceof SectionTag)) {
            throw Error('<form> can have only <section> children')
        }
    });
    this.children = children;
    this.attrs = attrs;
}

FormTag.__proto__ = Tag;
FormTag.tagName = 'form';

FormTag.getAttributes = function (node) {
    let completionStatusShow,
        completionStatusInHeader,
        confirmationNeeded;

    const stringBooleanMap = {
        'true': true,
        'false': false
    };

    if (node.attributes.completionStatusShow !== undefined) {
        completionStatusShow = node.attributes.completionStatusShow;
    } else if (node.attributes['completion-status-show'] === undefined) {
        completionStatusShow = node.attributes['completion-status-show'];
    }

    if (node.attributes.completionStatusInHeader !== undefined) {
        completionStatusInHeader = node.attributes.completionStatusInHeader;
    } else if (node.attributes['completion-status-in-header'] !== undefined) {
        completionStatusInHeader = node.attributes['completion-status-in-header'];
    }

    if (node.attributes.confirmationNeeded !== undefined) {
        confirmationNeeded = node.attributes.confirmationNeeded;
    } else if (node.attributes['confirmation-needed'] !== undefined) {
        confirmationNeeded = node.attributes['confirmation-needed'];
    }

    return new FormTagAttrs(
        node.attributes.path,
        node.attributes.method,
        node.attributes.header,
        node.attributes.footer,
        stringBooleanMap[completionStatusShow],
        stringBooleanMap[completionStatusInHeader],
        stringBooleanMap[confirmationNeeded]
    );
};

exports.ATag = ATag;
exports.BrTag = BrTag;
exports.FooterTag = FooterTag;
exports.FormTag = FormTag;
exports.HeaderTag = HeaderTag;
exports.InputTag = InputTag;
exports.LabelTag = LabelTag;
exports.LiTag = LiTag;
exports.PTag = PTag;
exports.SectionTag = SectionTag;
exports.UlTag = UlTag;
exports.Tag = Tag;
exports.getTagCls = getTagCls;
