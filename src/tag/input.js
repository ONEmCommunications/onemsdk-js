const Tag = require('./tag').Tag;
const { parseNumber } = require('../utils');

/**
 * @typedef InputTag
 * @extends Tag
 * @property {undefined} children
 * @property {InputTagAttrs} attrs
 */


/**
 *
 * @param {('date'|'datetime'|'email'|'hidden'|'location'|'number'|'phone'|'range'|'tel'|'text'|'textarea'|'url')} type
 * @param {number} [min]
 * @param {string} [minError]
 * @param {number} [minlength must be an integer]
 * @param {string} [minlengthError]
 * @param {number} [max]
 * @param {string} [maxError]
 * @param {number} [maxlength must be an integer]
 * @param {string} [maxlengthError]
 * @param {number} [step]
 * @param {string} [value] required if type="hidden"
 * @param {string} [pattern]
 * @constructor
 */
function InputTagAttrs(type, min, minError, minlength, minlengthError,
                       max, maxError, maxlength, maxlengthError, step, value, pattern) {
    // standard HTML5 attributes
    this.type = type;
    this.min = min;
    this.minlength = minlength;
    this.max = max;
    this.maxlength = maxlength;
    this.step = step;
    this.value = value;
    this.pattern = pattern;

    // non standard
    this.minError = minError;
    this.minlengthError = minlengthError;
    this.maxError = maxError;
    this.maxlengthError = maxlengthError;
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

    return new InputTagAttrs(
        node.attributes.type,
        parseNumber(node.attributes.min,'float'),
        node.attributes['min-error'] || node.attributes.minError,
        parseNumber(node.attributes.minlength,'int'),
        node.attributes['minlength-error'] || node.attributes.minlengthError,
        parseNumber(node.attributes.max,'float'),
        node.attributes['max-error'] || node.attributes.maxError,
        parseNumber(node.attributes.maxlength,'int'),
        node.attributes['maxlength-error'] || node.attributes.maxlengthError,
        parseNumber(node.attributes.step,'float'),
        node.attributes.value,
        node.attributes.pattern
    );
};

InputTag.prototype.toString = function () {
    return '';
};


exports.InputTag = InputTag;
