const Tag = require('./tag').Tag;
/**
 * @typedef HeaderTag
 * @extends Tag
 * @property {Array<string>} children
 * @property {undefined} attrs
 */


/**
 * Instantiates a new HeaderTag
 * @param {Array<string>} children
 * @constructor
 */
function HeaderTag(children) {
    if (children.length !== 1 || typeof children[0] !== 'string') {
        throw Error('<header> must have 1 text child')
    }
    this.children = children;
}

HeaderTag.__proto__ = Tag;
HeaderTag.tagName = 'header';

HeaderTag.prototype.toString = function headerTagToString() {
    if (this.children.length === 1) {
        return `${this.children[0]}`;
    }
    return '';
};


exports.HeaderTag = HeaderTag;
