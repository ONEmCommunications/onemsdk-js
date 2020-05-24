const Tag = require('./tag').Tag;

/**
 * @typedef CardMediaTag
 * @extends Tag
 * @property {undefined} children
 * @property {CardMediaTagAttrs} attrs
 */

/**
 *
 * @param {string} [src] public url of the avatar png image
 * @param {string} [avatarName] name of the avatar
 * @constructor
 */
function CardMediaTagAttrs(src) {
    this.src = src;
}

/**
 * @param {undefined} children
 * @param {CardMediaTagAttrs} attrs
 * @constructor
 */
function CardMediaTag(children, attrs) {
    this.children = undefined;
    this.attrs = attrs;
}

CardMediaTag.__proto__ = Tag;
CardMediaTag.tagName = 'cardmedia';

/**
 * @param {HTMLElement} node
 * @returns {CardMediaTagAttrs}
 */
CardMediaTag.getAttributes = function (node) {
    return new CardMediaTagAttrs(
        node.attributes.src
    );
};

CardMediaTag.prototype.toString = function () {
    return '';
};

exports.CardMediaTag = CardMediaTag;
