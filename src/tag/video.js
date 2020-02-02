const Tag = require('./tag').Tag;

/**
 * @typedef VideoTag
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
function VideoTagAttrs(src, alt) {
    // standard attributes
    this.src = src;
    this.alt = alt;
}

/**
 * @param {undefined} children
 * @param {InputTagAttrs} attrs
 * @constructor
 */
function VideoTag(children, attrs) {
    this.children = undefined;
    this.attrs = attrs;
}

VideoTag.__proto__ = Tag;
VideoTag.tagName = 'video';

/**
 * @param {HTMLVideoElement} node
 * @returns {VideoTagAttrs}
 */
VideoTag.getAttributes = function (node) {
    return new VideoTagAttrs(
        node.attributes.src,
        node.attributes.alt
    );
};

VideoTag.prototype.toString = function () {
    return null;
};


exports.VideoTag = VideoTag;
