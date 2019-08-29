const Tag = require('./tag').Tag;
/**
 * @typedef InputTag
 * @extends Tag
 * @property {undefined} children
 * @property {InputTagAttrs} attrs
 */


/**
 *
 * @param {('text'|'date'|'datetime')} type
 * @constructor
 */
function InputTagAttrs(type) {
    this.type = type;
}

/**
 * @param {undefined} children
 * @param {InputTagAttrs} attrs
 * @constructor
 */
function InputTag(children, attrs) {
    this.children = undefined;
    this.attrs = attrs;
}

InputTag.__proto__ = Tag;
InputTag.tagName = 'input';

/**
 * @param {HTMLInputElement} node
 * @returns {InputTagAttrs}
 */
InputTag.getAttributes = function (node) {
    return new InputTagAttrs(node.attributes.type);
};

InputTag.prototype.toString = function () {
    return '';
};


exports.InputTag = InputTag;
