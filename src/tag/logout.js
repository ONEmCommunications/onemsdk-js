const Tag = require('./tag').Tag;

/**
 * @typedef LogoutTag
 * @extends Tag
 * @property {undefined} children
 * @property {LogoutTagAttrs} attrs
 */

/**
 *
 * @param {string} [onSuccess]
 * @param {string} [onFailure]
 * @constructor
 */
function LogoutTagAttrs(onSuccess, onFailure) {
    this.onSuccess = onSuccess;
    this.onFailure = onFailure;
}

/**
 * @param {undefined} children
 * @param {LogoutTagAttrs} attrs
 * @constructor
 */
function LogoutTag(children, attrs) {
    this.children = undefined;
    this.attrs = attrs;
}

LogoutTag.__proto__ = Tag;
LogoutTag.tagName = 'logout';

/**
 * @param {HTMLElement} node
 * @returns {LogoutTagAttrs}
 */
LogoutTag.getAttributes = function (node) {
    return new LogoutTagAttrs(
        node.attributes['on-success'],
        node.attributes['on-failure']
    );
};

LogoutTag.prototype.toString = function () {
    return '';
};

exports.LogoutTag = LogoutTag;
