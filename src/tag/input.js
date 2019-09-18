const Tag = require('./tag').Tag;

/**
 * @typedef InputTag
 * @extends Tag
 * @property {undefined} children
 * @property {InputTagAttrs} attrs
 */


/**
 *
 * @param {('text'|'date'|'datetime'|'number'|'hidden'|'email'|'url'|'location')} type
 * @param {number} [min]
 * @param {string} [minError]
 * @param {number} [minlength must be an integer]
 * @param {string} [minlengthError]
 * @param {number} [max]
 * @param {string} [maxError]
 * @param {number} [maxlength must be an integer]
 * @param {string} [maxlengthError]
 * @param {number} [step must be an integer]
 * @param {string} [value] required if type="hidden"
 * @constructor
 */
function InputTagAttrs(type, min, minError, minlength, minlengthError,
                       max, maxError, maxlength, maxlengthError, step, value) {
    this.type = type;
    this.min = min;
    this.minError = minError;
    this.minlength = minlength;
    this.minlengthError = minlengthError;
    this.max = max;
    this.maxError = maxError;
    this.maxlength = maxlength;
    this.maxlengthError = maxlengthError;
    this.step = step;
    this.value = value;
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
        parseFloat(node.attributes.min) || undefined,
        node.attributes['min-error'] || node.attributes.minError,
        parseInt(node.attributes.minlength) || undefined,
        node.attributes['minlength-error'] || node.attributes.minlengthError,
        parseFloat(node.attributes.max) || undefined,
        node.attributes['max-error'] || node.attributes.maxError,
        parseInt(node.attributes.maxlength) || undefined,
        node.attributes['maxlength-error'] || node.attributes.maxlengthError,
        parseInt(node.attributes.step) || undefined,
        node.attributes.value
    );
};

InputTag.prototype.toString = function () {
    return '';
};


exports.InputTag = InputTag;
