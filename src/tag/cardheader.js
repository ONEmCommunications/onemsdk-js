const Tag = require('./tag').Tag;
const CardAvatarTag = require("./cardavatar").CardAvatarTag;

/**
 * @typedef CardHeaderTag
 * @extends Tag
 * @property {Array<CardAvatarTag>} [children]
 * @property {CardHeaderTagAttrs} attrs
 */

/**
 *
 * @param {string} title Title text
 * @param {string} [subtitle] Optional subtitle text
 * @constructor
 */
function CardHeaderTagAttrs(title, subtitle) {
    this.title = title;
    this.subtitle = subtitle;
}

/**
 * @property {Array<CardAvatarTag>} [children]
 * @param {CardHeaderTagAttrs} attrs
 * @constructor
 */
function CardHeaderTag(children, attrs) {
    this.children = children;
    this.attrs = attrs;
}

CardHeaderTag.__proto__ = Tag;
CardHeaderTag.tagName = 'cardheader';

/**
 * @param {HTMLElement} node
 * @returns {CardHeaderTagAttrs}
 */
CardHeaderTag.getAttributes = function (node) {
    return new CardHeaderTagAttrs(
        node.attributes.title,
        node.attributes.subtitle
    );
};

CardHeaderTag.prototype.toString = function () {
    return '';
};

exports.CardHeaderTag = CardHeaderTag;
