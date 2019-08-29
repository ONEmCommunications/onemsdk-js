const Tag = require('./tag').Tag;

/**
 * @typedef LabelTag
 * @extends Tag
 * @property {Array<string>} children
 * @property {undefined} attrs
 */


function LabelTag(children) {
    if (children.length !== 1 || typeof children[0] !== 'string') {
        throw Error('<label> must have 1 text child')
    }
    this.children = children;
}

LabelTag.__proto__ = Tag;
LabelTag.tagName = 'label';

LabelTag.prototype.toString = function labelTagToString() {
    return this.children[0];
};

exports.LabelTag = LabelTag;
