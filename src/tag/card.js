const Tag = require('./tag').Tag;
const CardHeaderTag = require("./cardheader").CardHeaderTag;
const CardMediaTag = require("./cardmedia").CardMediaTag;
const CardContentTag = require("./cardcontent").CardContentTag;
const CardActionsTag = require("./cardactions").CardActionsTag;

/**
 * @typedef CardTag
 * @extends Tag
 * @property {Array<CardHeaderTag|CardMediaTag|CardContentTag|CardActionsTag|>} children
 * @property {CardTagAttrs} attrs
 */

/**
 *
 * @param {string} [action] Optional path to call when the card is selected
 * @param {string} [method="GET"] Optional method associated with the action
 * @constructor
 */
function CardTagAttrs(action, method) {
    this.action = action;
    this.method = method;
}

/**
 * @property {Array<CardHeaderTag|CardMediaTag|CardContentTag|CardActionsTag|>} children
 * @param {CardTagAttrs} attrs
 * @constructor
 */
function CardTag(children, attrs) {

	let cardHeader = false;
	let cardMedia = false;
	let cardContent = false;
	let cardActions = false;

	children.forEach(function (tag) {
        if (tag instanceof CardHeaderTag && !cardHeader) {
			cardHeader = true;
		} else if (tag instanceof CardMediaTag && !cardMedia) {
			cardMedia = true;
		} else if (tag instanceof CardContentTag && !cardContent) {
			cardContent = true;	
		} else if (tag instanceof CardActionsTag && !cardActions) {
			cardActions = true;
		} else {
            throw Error('<card> can have only one instance of the following children: <cardheader> <cardmedia> <cardcontent> <cardactions>');
        }
    });

    this.children = children;
    this.attrs = attrs;
}

CardTag.__proto__ = Tag;
CardTag.tagName = 'card';

/**
 * @param {HTMLElement} node
 * @returns {CardTagAttrs}
 */
CardTag.getAttributes = function (node) {
    return new CardTagAttrs(
        node.attributes.action,
        node.attributes.method
    );
};

CardTag.prototype.toString = function () {
    return '';
};

exports.CardTag = CardTag;
