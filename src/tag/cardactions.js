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
    if (children.length === 0) {
        throw Error('<cardactions> must have at least 1 child')
    }
    
    children.forEach(function (child) {
        if (!(child instanceof CardActionTag)) {
            throw Error('<cardactions> can have only <cardaction> children')
        }
    });

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
