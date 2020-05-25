const Tag = require('./tag').Tag;
const CardActionTag = require("./cardaction").CardActionTag;

/**
 * @typedef CardActionsTag
 * @extends Tag
 * @property {Array<CardActionTag>} children
 * @property {undefined} attrs
 */

/**
 * @param {Array<CardActionTag>} children
 * @constructor
 */
function CardActionsTag(children) {
    this.children = children;
}

CardActionsTag.__proto__ = Tag;
CardActionsTag.tagName = 'cardactions';

CardActionsTag.prototype.toString = function () {
    return this.children.map(function (child) {
        return child.toString();
    });
};

exports.CardActionsTag = CardActionsTag;
