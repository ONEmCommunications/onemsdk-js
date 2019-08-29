const Tag = require('./tag').Tag;

/**
 * @typedef ATag
 * @extends Tag
 * @property {Array<string>} children
 * @property {ATagAttrs} attrs
 */


/**
 * @param {string} href
 * @param {('GET'|'POST')} method default 'GET'
 * @constructor
 */
function ATagAttrs(href, method) {
    if (!href) {
        throw Error('<a> must contain href attribute');
    }
    this.href = href;
    this.method = method || 'GET';
}

/**
 * @param {Array<string>} children
 * @param {ATagAttrs} attrs
 * @constructor
 */
function ATag(children, attrs) {
    if (children.length !== 1 || typeof children[0] !== 'string') {
        throw Error('<a> must have 1 text child')
    }
    this.children = children;
    this.attrs = attrs;
}

ATag.__proto__ = Tag;
ATag.tagName = 'a';

ATag.prototype.toString = function aTagToString() {
    return this.children[0];
};


/**
 *
 * @param {HTMLAnchorElement} node
 */
ATag.getAttributes = function (node) {
    return new ATagAttrs(node.attributes.href, node.attributes.method);
};


exports.ATag = ATag;
