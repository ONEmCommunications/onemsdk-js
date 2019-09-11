const Tag = require('./tag').Tag;
const BrTag = require("./br").BrTag;
const FooterTag = require("./footer").FooterTag;
const HeaderTag = require("./header").HeaderTag;
const InputTag = require("./input").InputTag;
const LabelTag = require("./label").LabelTag;
const PTag = require("./p").PTag;
const UlTag = require("./ul").UlTag;

/**
 * @typedef SectionTag
 * @extends Tag
 * @property {Array<HeaderTag|FooterTag|UlTag|PTag|BrTag|InputTag|LabelTag>} children
 * @property {SectionTagAttrs} attrs
 */

/**
 * Instantiates a new SectionTagAttrs
 * @param {string} [name] this attribute is relevant only if the
 * SectionTag is part of a FormTag
 * @param {string} [header] text that will be included in header
 * @param {string} [footer] text that will be included in footer
 * @param {boolean} [autoSelect=false]
 * @param {boolean} [multiSelect=false]
 * @param {boolean} [numbered=false]
 * @param {string} [chunkingFooter]
 * @param {string} [confirmationLabel]
 * @param {string} [method]
 * @param {boolean} [required=false]
 * @param {boolean} [statusExclude=false]
 * @param {boolean} [statusPrepend=false]
 * @param {string} [url]
 * @param {string} [validateTypeError]
 * @param {string} [validateTypeErrorFooter]
 * @param {string} [validateUrl]
 * @constructor
 */
function SectionTagAttrs(name, header, footer, autoSelect, multiSelect, numbered, chunkingFooter,
                         confirmationLabel, method, required, statusExclude, statusPrepend, url,
                         validateTypeError, validateTypeErrorFooter, validateUrl) {
    this.header = header || null;
    this.footer = footer || null;
    this.name = name || null;
    this.autoSelect = autoSelect || false;
    this.multiSelect = multiSelect || false;
    this.numbered = numbered || false;
    this.chunkingFooter = chunkingFooter;
    this.confirmationLabel = confirmationLabel;
    this.method = method;
    this.required = required || false;
    this.statusExclude = statusExclude || false;
    this.statusPrepend = statusPrepend || false;
    this.url = url;
    this.validateTypeError = validateTypeError;
    this.validateTypeErrorFooter = validateTypeErrorFooter;
    this.validateUrl = validateUrl;
}

/**
 * Instantiates a new SectionTag. A SectionTag may represent a step in a form,
 * a menu or a block of text. A user will always receive the content of a
 * SectionTag at a time.
 * @param {Array<PTag | BrTag | UlTag | LabelTag | HeaderTag | FooterTag | InputTag>} children
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

    return new SectionTagAttrs(
        node.attributes.name,
        node.attributes.header,
        node.attributes.footer,
        autoSelect,
        multiSelect,
        numbered,
        chunkingFooter,
        confirmationLabel,
        node.attributes.method,
        required,
        statusExclude,
        statusPrepend,
        node.attributes.url,
        validateTypeError,
        validateTypeErrorFooter,
        validateUrl
    );
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
            if (child instanceof PTag || child instanceof UlTag) {
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
