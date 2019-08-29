const Tag = require('./tag').Tag;
const SectionTag = require("./section").SectionTag;

/**
 * @typedef FormTag
 * @extends Tag
 * @property {Array<SectionTag>} children
 * @property {FormTagAttrs} attrs
 */

/**
 * Instantiates a new FormTagAttrs
 * @param {string} action the path where the form data is sent to after the user
 * finishes the form
 * @param {string} method the method use to send the form data
 * @param {string|undefined} header the global form header which can be
 * overwritten at the SectionTag level
 * @param {string|undefined} footer the global form footer which can be
 * overwritten at the SectionTag level
 * @param {boolean|undefined} completionStatusShow whether to display the
 * progress the user made in a form
 * @param {boolean|undefined} completionStatusInHeader whether to display
 * that progress in header (if false it will be displayed in body)
 * @param {boolean|undefined} confirmationNeeded whether the user will receive
 * a form confirmation at the end of the form
 * @constructor
 */
function FormTagAttrs(action, method, header, footer, completionStatusShow,
                      completionStatusInHeader, confirmationNeeded) {
    if (!action) {
        throw Error('(action) is a required attribute for <form>');
    }
    this.action = action;
    this.method = method || 'POST';

    this.header = null;
    this.footer = null;
    this.completionStatusInHeader = completionStatusInHeader;
    this.completionStatusShow = completionStatusShow;
    this.confirmationNeeded = confirmationNeeded;

    if (typeof header === 'string') {
        this.header = header;
    }
    if (typeof footer === 'string') {
        this.footer = footer;
    }
}

/**
 * Instantiates a new FormTag. It is the equivalent of the HTML <form> tag and
 * it is always the root (it cannot be placed inside of another tag). The
 * FormTag is be used in all the situations where some data is expected from the
 * user. The FormTag can have only SectionTag children and each SectionTag
 * deals with one piece of data from the user.
 * @param {Array<SectionTag>} children
 * @param {FormTagAttrs} attrs
 * @constructor
 * */
function FormTag(children, attrs) {
    if (children.length === 0) {
        throw Error('<form> must have at least 1 child');
    }

    children.forEach(function (sectionTag) {
        if (!(sectionTag instanceof SectionTag)) {
            throw Error('<form> can have only <section> children')
        }
        if (!sectionTag.attrs.name) {
            throw Error('<form> can contain only named <section> tags. ' +
                'Please add a unique "name" attribute in each form  section.')
        }
    });

    this.children = children;
    this.attrs = attrs;
}

FormTag.__proto__ = Tag;
FormTag.tagName = 'form';

FormTag.getAttributes = function (node) {
    const completionStatusShow = node.attributes.hasOwnProperty('completionStatusShow') ||
        node.attributes.hasOwnProperty('completion-status-show');
    const completionStatusInHeader = node.attributes.hasOwnProperty('completionStatusInHeader') ||
        node.attributes.hasOwnProperty('completion-status-in-header');
    const confirmationNeeded = node.attributes.hasOwnProperty('confirmationNeeded') ||
        node.attributes.hasOwnProperty('confirmation-needed');

    return new FormTagAttrs(
        node.attributes.action,
        node.attributes.method,
        node.attributes.header,
        node.attributes.footer,
        completionStatusShow,
        completionStatusInHeader,
        confirmationNeeded,
    );
};

exports.FormTag = FormTag;
