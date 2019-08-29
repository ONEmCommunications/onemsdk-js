const Tag = require('./tag').Tag;

/**
 * @typedef BrTag
 * @extends Tag
 * @property {undefined} children
 * @property {undefined} attrs
 */

/**
 * @constructor
 */
function BrTag() {
}

BrTag.__proto__ = Tag;
BrTag.tagName = 'br';

BrTag.prototype.toString = function brTagToString() {
    return '\n';
};

exports.BrTag = BrTag;
