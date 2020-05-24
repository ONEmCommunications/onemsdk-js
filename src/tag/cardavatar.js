const Tag = require('./tag').Tag;

/**
 * @typedef CardAvatarTag
 * @extends Tag
 * @property {undefined} children
 * @property {CardAvatarTagAttrs} attrs
 */

/**
 *
 * @param {string} [src] public url of the avatar png image
 * @param {string} [name] name of the avatar
 * @constructor
 */
function CardAvatarTagAttrs(src, name) {
    this.src = src;
    this.name = name;
}

/**
 * @param {undefined} children
 * @param {CardAvatarTagAttrs} attrs
 * @constructor
 */
function CardAvatarTag(children, attrs) {
    this.children = undefined;
    this.attrs = attrs;
}

CardAvatarTag.__proto__ = Tag;
CardAvatarTag.tagName = 'cardavatar';

/**
 * @param {HTMLElement} node
 * @returns {CardAvatarTagAttrs}
 */
CardAvatarTag.getAttributes = function (node) {
    return new CardAvatarTagAttrs(
        node.attributes.src,
        node.attributes.name
    );
};

CardAvatarTag.prototype.toString = function () {
    return '';
};

exports.CardAvatarTag = CardAvatarTag;
