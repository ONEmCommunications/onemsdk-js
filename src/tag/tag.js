const parser = require('node-html-parser');
const index = require('./index');

/**
 * @typedef Tag
 * @property {Array<Tag> | undefined} children
 * @property {Object | undefined} attrs
 * @property {string} tagName
 */


/**
 * Instantiates a Tag
 * @param {Array<Tag> | undefined} children
 * @param {Object | undefined} attrs
 * @constructor
 */
function Tag(children, attrs) {
    this.children = children;
    this.attrs = attrs;
}

Tag.tagName = undefined;

/**
 * @param {HTMLElement} node
 * @returns {FormTag | CardTag | CardHeaderTag | CardAvatarTag | CardMediaTag | CardContentTag | CardActionsTag | CardActionTag | 
 * SectionTag | SnackbarTag | UlTag | LiTag | LoginTag | LogoutTag | ATag | PTag | BrTag | 
 * HeaderTag | FooterTag | InputTag | LabelTag | TextareaTag | ImgTag | VideoTag}
 */
Tag.fromNode = function (node) {
    if (this.tagName !== node.tagName) {
        throw Error(`Expected <${this.tagName}>, received <${node.tagName}>`)
    }

    const attrs = this.getAttributes(node);

    let children = [];

    node.childNodes.forEach(function (childNode) {
        const childCls = index.getTagCls(childNode.tagName);

        if (childNode instanceof parser.TextNode) {
            children.push(childNode.text.trim());
        } else {
            children.push(childCls.fromNode(childNode));
        }
    });

    return new this(children, attrs);
};

/**
 * Returns the attributes specific to a certain tag
 * @param {HTMLElement} node
 * @returns {Object | undefined}
 */
Tag.getAttributes = function (node) {
    return undefined;
};


exports.Tag = Tag;
