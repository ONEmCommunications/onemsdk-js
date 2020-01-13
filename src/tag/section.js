const Tag = require('./tag').Tag;
const BrTag = require("./br").BrTag;
const FooterTag = require("./footer").FooterTag;
const HeaderTag = require("./header").HeaderTag;
const InputTag = require("./input").InputTag;
const LabelTag = require("./label").LabelTag;
const PTag = require("./p").PTag;
const UlTag = require("./ul").UlTag;
const TextareaTag = require("./textarea").TextareaTag;

/**
 * @typedef SectionTag
 * @extends Tag
 * @property {Array<HeaderTag|FooterTag|UlTag|PTag|BrTag|InputTag|TextareaTag|LabelTag>} children
 * @property {SectionTagAttrs} attrs
 */

/**
 * Instantiates a new SectionTagAttrs
 * @param {object} [props]
 * @param {string} [props.name] this attribute is relevant only if the
 *                              SectionTag is part of a FormTag
 * @param {string} [props.header] text that will be included in header
 * @param {string} [props.footer] text that will be included in footer
 * @param {boolean} [props.autoSelect=false]
 * @param {boolean} [props.multiSelect=false]
 * @param {boolean} [props.numbered=false]
 * @param {string} [props.chunkingFooter]
 * @param {string} [props.confirmationLabel]
 * @param {string} [props.method]
 * @param {boolean} [props.required=false]
 * @param {string} [props.default]
 * @param {boolean} [props.statusExclude=false]
 * @param {boolean} [props.statusPrepend=false]
 * @param {string} [props.url]
 * @param {string} [props.validateTypeError]
 * @param {string} [props.validateTypeErrorFooter]
 * @param {string} [props.validateUrl]
 * @constructor
 */
function SectionTagAttrs(props) {
    this.header = props.header || null;
    this.footer = props.footer || null;
    this.name = props.name || null;
    this.autoSelect = props.autoSelect || false;
    this.multiSelect = props.multiSelect || false;
    this.numbered = props.numbered || false;
    this.chunkingFooter = props.chunkingFooter;
    this.confirmationLabel = props.confirmationLabel;
    this.method = props.method;
    this.required = props.required || false;
    this.default = props.default || null;
    this.statusExclude = props.statusExclude || false;
    this.statusPrepend = props.statusPrepend || false;
    this.url = props.url;
    this.validateTypeError = props.validateTypeError;
    this.validateTypeErrorFooter = props.validateTypeErrorFooter;
    this.validateUrl = props.validateUrl;
}

/**
 * Instantiates a new SectionTag. A SectionTag may represent a step in a form,
 * a menu or a block of text. A user will always receive the content of a
 * SectionTag at a time.
 * @param {Array<PTag | BrTag | UlTag | LabelTag | HeaderTag | FooterTag | TextareaTag | InputTag>} children
 * @param {SectionTagAttrs} attrs
 * @constructor
 */
function SectionTag(children, attrs) {
    if (children.length === 0) {
        throw Error('<section> must have at least 1 child');
    }

    children.forEach(function (child) {
        switch (child.constructor.tagName) {
            case 'p':
            case 'br':
            case 'ul':
            case 'input':
            case 'label':
            case 'header':
            case 'footer':
            case 'textarea':
                break;
            default:
                if (typeof child !== 'string') {
                    throw Error(`<section> cannot have <${child.constructor.tagName}> child`);
                }
        }
    });

    this.children = children;
    this.attrs = attrs;
}

SectionTag.__proto__ = Tag;
SectionTag.tagName = 'section';

SectionTag.getAttributes = function (node) {
    // Note that boolean attributes in HTML are evaluated to true if they are
    // present (their actual value does not matter). They are evaluated to false
    // only when they are missing
    const autoSelect = node.attributes.hasOwnProperty('auto-select') ||
        node.attributes.hasOwnProperty('autoSelect');
    const multiSelect = node.attributes.hasOwnProperty('multi-select') ||
        node.attributes.hasOwnProperty('multiSelect');
    const numbered = node.attributes.hasOwnProperty('numbered');
    const chunkingFooter = node.attributes['chunking-footer'] ||
        node.attributes.chunkingFooter;
    const confirmationLabel = node.attributes['confirmation-label'] ||
        node.attributes.confirmationLabel;
    const required = node.attributes.hasOwnProperty('required');
    const statusExclude = node.attributes.hasOwnProperty('status-exclude') ||
        node.attributes.hasOwnProperty('statusExclude');
    const statusPrepend = node.attributes.hasOwnProperty('status-prepend') ||
        node.attributes.hasOwnProperty('statusPrepend');
    const validateTypeError = node.attributes['validate-type-error'] ||
        node.attributes.validateTypeError;
    const validateTypeErrorFooter = node.attributes['validate-type-error-footer'] ||
        node.attributes.validateTypeErrorFooter;
    const validateUrl = node.attributes['validate-url'] ||
        node.attributes.validateUrl;

    return new SectionTagAttrs({
        name: node.attributes.name,
        header: node.attributes.header,
        footer: node.attributes.footer,
        autoSelect: autoSelect,
        multiSelect: multiSelect,
        numbered: numbered,
        chunkingFooter: chunkingFooter,
        confirmationLabel: confirmationLabel,
        method: node.attributes.method,
        required: required,
        default: node.attributes.default,
        statusExclude: statusExclude,
        statusPrepend: statusPrepend,
        url: node.attributes.url,
        validateTypeError: validateTypeError,
        validateTypeErrorFooter: validateTypeErrorFooter,
        validateUrl: validateUrl,
    });
};

SectionTag.prototype.toString = function sectionTagToString(excludeHeader, excludeFooter) {
    // Add a temporary \n for help
    let renderedChildren = ['\n'];

    this.children.forEach(function (child) {
        let text;

        if (child instanceof HeaderTag && excludeHeader) {
            // Do not include the header
            return;
        }

        if (child instanceof FooterTag && excludeFooter) {
            // Do not include the footer
            return;
        }

        if (typeof child === 'string') {
            text = child;
        } else {
            text = child.toString();
        }
        if (text) {
            if (child instanceof PTag ||
                child instanceof TextareaTag ||
                child instanceof UlTag) {
                if (renderedChildren[renderedChildren.length - 1] !== '\n') {
                    renderedChildren.push('\n');
                }
                renderedChildren.push(child.toString());
                renderedChildren.push('\n');
            } else {
                renderedChildren.push(child.toString());
            }
        }
    });

    if (renderedChildren[renderedChildren.length - 1] === '\n') {
        renderedChildren = renderedChildren.slice(0, renderedChildren.length - 1);
    }

    // Remove the temporary \n
    return renderedChildren.slice(1, undefined).join('');
};


exports.SectionTag = SectionTag;
