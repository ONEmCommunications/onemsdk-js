const Tag = require('./tag').Tag;
const LiTag = require("./li").LiTag;

/**
 * @typedef UlTag
 * @extends Tag
 * @property {Array<LiTag>} children
 * @property {undefined} attrs
 */

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

UlTag.prototype.toString = function ulTagToString() {
    return this.children.map(function (child) {
        return child.toString();
    }).join('\n');
};

exports.UlTag = UlTag;
