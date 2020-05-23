const Tag = require('./tag').Tag;
const { parseNumber } = require('../utils');

/**
 * @typedef SnackbarTag
 * @extends Tag
 * @property {undefined} children
 * @property {SnackbarTagAttrs} attrs
 */

/**
 *
 * @param {string} [message]
 * @param {string} [severity]
 * @constructor
 */
function SnackbarTagAttrs(message, severity, actionName, actionPath, actionMethod, autoHideDuration) {
    this.message = message;
    this.severity = severity;
    this.actionName = actionName;
    this.actionPath = actionPath;
    this.actionMethod = actionMethod;
    this.autoHideDuration = autoHideDuration;
}

/**
 * @param {undefined} children
 * @param {SnackbarTagAttrs} attrs
 * @constructor
 */
function SnackbarTag(children, attrs) {
    this.children = undefined;
    this.attrs = attrs;
}

SnackbarTag.__proto__ = Tag;
SnackbarTag.tagName = 'snackbar';

/**
 * @param {HTMLElement} node
 * @returns {SnackbarTagAttrs}
 */
SnackbarTag.getAttributes = function (node) {

    return new SnackbarTagAttrs(
        node.attributes.message,
        node.attributes.severity,
        node.attributes['action-name'],
        node.attributes['action-path'],
        node.attributes['action-method'],
        parseNumber(node.attributes['auto-hide-duration'],'int')
    );
};

SnackbarTag.prototype.toString = function () {
    return '';
};

exports.SnackbarTag = SnackbarTag;
