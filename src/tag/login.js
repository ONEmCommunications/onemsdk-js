const Tag = require('./tag').Tag;

/**
 * @typedef LoginTag
 * @extends Tag
 * @property {undefined} children
 * @property {LoginTagAttrs} attrs
 */

/**
 *
 * @param {string} [onSuccess]
 * @param {string} [onFailure]
 * @constructor
 */
function LoginTagAttrs(onSuccess, onFailure) {
    this.onSuccess = onSuccess;
    this.onFailure = onFailure;
}

/**
 * @param {undefined} children
 * @param {LoginTagAttrs} attrs
 * @constructor
 */
function LoginTag(children, attrs) {
    this.children = undefined;
    this.attrs = attrs;
}

LoginTag.__proto__ = Tag;
LoginTag.tagName = 'login';

/**
 * @param {HTMLElement} node
 * @returns {LoginTagAttrs}
 */
LoginTag.getAttributes = function (node) {
    return new LoginTagAttrs(
        node.attributes['on-success'],
        node.attributes['on-failure']
    );
};

LoginTag.prototype.toString = function () {
    return '';
};

exports.LoginTag = LoginTag;
