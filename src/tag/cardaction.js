const Tag = require('./tag').Tag;

/**
 * @typedef CardActionTag
 * @extends Tag
 * @property {undefined} children
 * @property {CardActionTagAttrs} attrs
 */

/**
 *
 * @param {string} name name of the card action button
 * @param {string} path path for the callback when the card action is selected
 * @param {string} method to use for the callback
 * @constructor
 */
function CardActionTagAttrs(name, path, method) {
    this.name = name;
	this.path = path;
	this.method = method;
}

/**
 * @param {undefined} children
 * @param {CardActionTagAttrs} attrs
 * @constructor
 */
function CardActionTag(children, attrs) {
    this.children = undefined;
    this.attrs = attrs;
}

CardActionTag.__proto__ = Tag;
CardActionTag.tagName = 'cardaction';

/**
 * @param {HTMLElement} node
 * @returns {CardActionTagAttrs}
 */
CardActionTag.getAttributes = function (node) {
    return new CardActionTagAttrs(
        node.attributes.name,
        node.attributes.path,
        node.attributes.method
    );
};

CardActionTag.prototype.toString = function () {
    return '';
};

exports.CardActionTag = CardActionTag;
