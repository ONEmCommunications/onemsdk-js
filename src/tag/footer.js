const Tag = require('./tag').Tag;

/**
 * @typedef FooterTag
 * @extends Tag
 * @property {Array<string>} children
 * @property {undefined} attrs
 */

/**
 * Instantiates a new FooterTag
 * @param {Array<string>} children
 * @constructor
 */
function FooterTag(children) {
    if (children.length !== 1 || typeof children[0] !== 'string') {
        throw Error('<footer> must have 1 text child')
    }
    this.children = children;
}

FooterTag.__proto__ = Tag;
FooterTag.tagName = 'footer';

FooterTag.prototype.toString = function () {
    return this.children[0];
};

exports.FooterTag = FooterTag;

