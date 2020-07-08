const Tag = require('./tag').Tag;
const ImgTag = require("./img").ImgTag;
const VideoTag = require("./video").VideoTag;
/**
 * @typedef ATag
 * @extends Tag
 * @property {Array<string>} children
 * @property {ATagAttrs} attrs
 */


/**
 * @param {string} href
 * @param {('GET'|'POST')} method default 'GET'
 * @constructor
 */
function ATagAttrs(href, method) {
    if (!href) {
        throw Error('<a> must contain href attribute');
    }
    this.href = href;
    this.method = method || 'GET';
}

/**
 * @param {Array<string>} children
 * @param {ATagAttrs} attrs
 * @constructor
 */
function ATag(children, attrs) {
    if (children.length === 0 || children.length > 2) {
        throw Error('<a> must have 1 or 2 children')
    }
    if (children.length >= 1 &&
        typeof children[0] !== 'string' &&
        !(children[0] instanceof ImgTag) &&
        !(children[0] instanceof VideoTag) ) {
        throw Error('Child of <a> must be one of string, img or video')
    }
    if (children.length === 2 && typeof children[1] !== 'string' &&
        !(children[1] instanceof ImgTag) &&
        !(children[1] instanceof VideoTag) ) {
        throw Error('Child of <a> must be one of string, img or video')
    }
    this.children = children;
    this.attrs = attrs;
}

ATag.__proto__ = Tag;
ATag.tagName = 'a';

ATag.prototype.toString = function aTagToString() {
    if (typeof this.children[0] === 'string') {
        return this.children[0];
    }
    return null;
};


/**
 *
 * @param {HTMLAnchorElement} node
 */
ATag.getAttributes = function (node) {
    return new ATagAttrs(node.attributes.href, node.attributes.method);
};


exports.ATag = ATag;
