const Tag = require('./tag').Tag;
const ATag = require('./a').ATag;

/**
 * @typedef LiTag
 * @extends Tag
 * @property {Array<ATag | string>} children
 * @property {LiTagAttrs} attrs
 */


/**
 * @param {string|undefined} value
 * @constructor
 */
function LiTagAttrs(value, textSearch) {
    this.value = value || null;
    this.textSearch = textSearch || null;
}

/**
 * @param {Array<ATag|string>} children
 * @param {LiTagAttrs} attrs
 * @constructor
 */
function LiTag(children, attrs) {
    if (
        children.length !== 1 ||
        !(children[0] instanceof ATag || typeof children[0] === 'string')
    ) {
        throw Error('<li> must have 1 child (<a> or text)')
    }
    this.children = children;
    this.attrs = attrs;
}

LiTag.__proto__ = Tag;
LiTag.tagName = 'li';

LiTag.getAttributes = function (node) {
    const value = node.attributes.value;
    const textSearch = node.attributes['text-search'] || node.attributes.textSearch;
    return new LiTagAttrs(value, textSearch);
};

LiTag.prototype.toString = function liTagToString() {
    if (this.children[0] instanceof ATag) {
        return this.children[0].toString();
    }
    return this.children[0];
};


exports.LiTag = LiTag;
