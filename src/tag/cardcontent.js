const Tag = require('./tag').Tag;

/**
 * @typedef CardContentTag
 * @extends Tag
 * @property {undefined} children
 * @property {CardContentTagAttrs} attrs
 */

/**
 *
 * @param {string} [title] title of the card
 * @param {string} [subtitle] subtitle of the card
 * @param {string} [content] text content to be displayed
 * @constructor
 */
function CardContentTagAttrs(title, subtitle, content) {
    this.title = title;
    this.subtitle = subtitle;
    this.content = content;
}

/**
 * @param {undefined} children
 * @param {CardContentTagAttrs} attrs
 * @constructor
 */
function CardContentTag(children, attrs) {
    this.children = undefined;
    this.attrs = attrs;
}

CardContentTag.__proto__ = Tag;
CardContentTag.tagName = 'cardcontent';

/**
 * @param {HTMLElement} node
 * @returns {CardContentTagAttrs}
 */
CardContentTag.getAttributes = function (node) {
    return new CardContentTagAttrs(
        node.attributes.title,
        node.attributes.subtitle,
        node.attributes.content
    );
};

CardContentTag.prototype.toString = function () {
    return '';
};

exports.CardContentTag = CardContentTag;
