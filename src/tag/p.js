const Tag = require('./tag').Tag;

/**
 * @typedef PTag
 * @extends Tag
 * @property {Array<string>} children
 * @property {undefined} attrs
 */


/**
 * @param {Array<string>} children
 * @constructor
 */
function PTag(children) {
    if (children.length > 1) {
        throw Error('<p> cannot have more than 1 child');
    }
    if (children.length === 1 && typeof children[0] !== 'string') {
        throw Error('<p> child must be text');
    }
    this.children = children;
}

PTag.__proto__ = Tag;
PTag.tagName = 'p';

PTag.prototype.toString = function pTagToString() {
    if (this.children.length === 1) {
        return `${this.children[0]}`;
    }
    return '';
};


exports.PTag = PTag;
