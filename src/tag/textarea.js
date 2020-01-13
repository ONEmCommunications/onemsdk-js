const Tag = require('./tag').Tag;

/**
 * @typedef TextareaTag
 * @extends Tag
 * @property {Array<string>} children
 * @property {undefined} attrs
 */


/**
 * @param {Array<string>} children
 * @constructor
 */
function TextareaTag(children) {
    if (children.length > 1) {
        throw Error('<textarea> cannot have more than 1 child');
    }
    if (children.length === 1 && typeof children[0] !== 'string') {
        throw Error('<textarea> child must be text');
    }
    this.children = children;
}

TextareaTag.__proto__ = Tag;
TextareaTag.tagName = 'textarea';

TextareaTag.prototype.toString = function TextareaTagToString() {
    if (this.children.length > 0) {
        throw Error('<textarea> cannot have children, use <section> tag with default attribute to set default value');
    }
    return '';
};


exports.TextareaTag = TextareaTag;
