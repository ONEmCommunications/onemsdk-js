const Tag = require('./tag').Tag;

/**
 * @typedef ImgTag
 * @extends Tag
 * @property {undefined} children
 * @property {InputTagAttrs} attrs
 */


/**
 *
 * @param {string} [src]
 * @param {string} [alt]
 * @constructor
 */
function ImgTagAttrs(src, alt) {
    // standard attributes
    this.src = src;
    this.alt = alt;
}

/**
 * @param {undefined} children
 * @param {InputTagAttrs} attrs
 * @constructor
 */
function ImgTag(children, attrs) {
    this.children = undefined;
    this.attrs = attrs;
}

ImgTag.__proto__ = Tag;
ImgTag.tagName = 'img';

/**
 * @param {HTMLImgElement} node
 * @returns {ImgTagAttrs}
 */
ImgTag.getAttributes = function (node) {
    return new ImgTagAttrs(
        node.attributes.src,
        node.attributes.alt
    );
};

ImgTag.prototype.toString = function () {
    return null;
};


exports.ImgTag = ImgTag;
