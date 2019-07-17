const tags = require('./tag');
const UlTag = tags.UlTag,
    SectionTag = tags.SectionTag,
    FormTag = tags.FormTag,
    LiTag = tags.LiTag;


/**
 * @typedef {object} Form
 * @property {('form')} type
 * @property {string|undefined} header header value
 * @property {string|undefined} footer footer value
 * @property {FormMeta} meta
 * @property {('get'|'post'|'put'|'delete')} method
 * @property {string} path
 * @property {FormItemContent | FormItemMenu} body form body object
 */

/**
 * @typedef {object} FormMeta
 * @property {boolean|undefined} completionStatusShow
 * @property {boolean|undefined} completionStatusInHeader
 * @property {boolean|undefined} confirmationNeeded
 */

/**
 * @typedef {object} FormItemContent
 * @property {('string', 'date', 'datetime')} type
 * @property {string} name
 * @property {string} description
 * @property {string|undefined} header
 * @property {string|undefined} footer
 */

/**
 * @typedef {Object} FormItemMenu
 * @property {('form-menu')} type
 * @property {Array<FormItemMenuItem>} body
 */

/**
 * @typedef {object} FormItemMenuItem
 * @property {('option'|'content')} type
 * @property {string} description
 * @property {string|undefined} value
 */

/**
 * @typedef {Object} Menu
 * @property {('menu')} type
 * @property {Array<MenuItem>} body
 * @property {string|undefined} header
 * @property {string|undefined} footer
 */

/**
 * @typedef {object} MenuItem
 * @property {('option'|'content')} type indicating menu option or plain content
 * @property {string} description
 * @property {string|undefined} path For menu options only. Path to be used for HTTP callback (added to base path configured in app's settings in developer portal)
 * @property {('get'|'post'|'put'|'delete'|undefined)} method=get For menu options only.  HTTP method that should be used when redirecting after successful menu option submission
 */

/**
 * @typedef {Object} Response
 * @property {String | undefined} messageId
 * @property {('form', 'menu')} contentType
 * @property {Form | Menu} content
 */

/**
 * Instantiates a new Form
 * @param {Array<FormItemContent|FormItemMenu>} body
 * @param {('GET'|'POST'|'PUT'|'DELETE')} method='POST'
 * @param {string} path
 * @param {string|undefined} header
 * @param {string|undefined} footer
 * @param {FormMeta|undefined} meta
 * @constructor
 */
function Form(body, method, path, header, footer, meta) {
    if (!body || !path) {
        throw Error('(body, path) are mandatory');
    }
    this.type = 'form';
    this.body = body;
    this.method = method || 'POST';
    this.path = path;
    this.header = header || null;
    this.footer = footer || null;
    this.meta = meta || null;
}

/**
 * Creates a Form from a FormTag
 * @param {FormTag} formTag
 * @returns {Form}
 */
Form.fromTag = function (formTag) {
    let body = [];
    formTag.children.forEach(function (sectionTag) {
        let childType = FormItemContent;
        for (let i = 0; i < sectionTag.children.length; i++) {
            if (sectionTag.children[i] instanceof UlTag) {
                childType = FormItemMenu;
                break;
            }
        }
        body.push(childType.fromTag(sectionTag));
    });

    return new Form(
        body,
        formTag.attrs.method,
        formTag.attrs.path,
        formTag.attrs.header,
        formTag.attrs.footer,
        new FormMeta(
            formTag.attrs.completionStatusShow,
            formTag.attrs.completionStatusInHeader,
            formTag.attrs.confirmationNeeded
        )
    );
};

/**
 * Instantiates a new FormMeta
 * @param {boolean|undefined} completionStatusShow
 * @param {boolean|undefined} completionStatusInHeader
 * @param {boolean|undefined} confirmationNeeded
 * @constructor
 */
function FormMeta(completionStatusShow, completionStatusInHeader, confirmationNeeded) {
    this.completionStatusShow = completionStatusShow || null;
    this.completionStatusInHeader = completionStatusInHeader || null;
    this.confirmationNeeded = confirmationNeeded || null;
}

/**
 * Instantiates a new FormItemContent
 * @param {('string', 'date', 'datetime')} type
 * @param {string} name
 * @param {string} description
 * @param {string|undefined} header
 * @param {string|undefined} footer
 * @constructor
 */
function FormItemContent(type, name, description, header, footer) {
    this.type = type;
    this.name = name;
    this.description = description;
    this.header = header || null;
    this.footer = footer || null;
}

/**
 * Creates a FormItemContent from a SectionTag
 * @param {SectionTag} sectionTag
 * @returns {FormItemContent}
 */
FormItemContent.fromTag = function (sectionTag) {
    return new FormItemContent(
        sectionTag.attrs.expectedResponse,
        sectionTag.attrs.name,
        sectionTag.toString(),
        sectionTag.attrs.header,
        sectionTag.attrs.footer
    );
};

/**
 * Instantiates a new FormItemMenu
 * @param {Array<FormItemMenuItem>} body
 * @constructor
 */
function FormItemMenu(body) {
    this.type = 'form-menu';
    this.body = body;
}

/**
 * Creates a FormItemMenu from a SectionTag
 * @param {SectionTag} sectionTag
 * @returns {FormItemMenu}
 */
FormItemMenu.fromTag = function (sectionTag) {
    let body = [];
    sectionTag.children.forEach(function (child) {
        if (child instanceof UlTag) {
            child.children.forEach(function (liTag) {
                body.push(FormItemMenuItem.fromTag(liTag));
            })
        } else {
            body.push(FormItemMenuItem.fromTag(child));
        }
    });

    return new FormItemMenu(body);
};

/**
 * Instantiates a new FormItemMenuItem
 * @param {('option', 'content')} type
 * @param {string} description
 * @param {string|undefined} value
 * @constructor
 */
function FormItemMenuItem(type, description, value) {
    this.type = type;
    this.description = description;
    this.value = value || null;
}

/**
 * Creates a FormItemMenuItem from a SectionTag's child
 * @param tag
 * @returns {FormItemMenuItem}
 */
FormItemMenuItem.fromTag = function (tag) {
    let item;
    if (tag instanceof String) {
        item = new FormItemMenuItem('content', tag, undefined);
    } else if (tag instanceof LiTag) {
        if (tag.attrs.value) {
            item = new FormItemMenuItem('option', tag.toString(), tag.attrs.value);
        } else {
            item = new FormItemMenuItem('content', tag.toString(), undefined);
        }
    } else {
        item = new FormItemMenuItem('content', tag.toString(), undefined);
    }
    return item;
};

/**
 * Instantiates a new Menu
 * @param {Array<MenuItem>} body
 * @param {String | undefined} header
 * @param {String | undefined} footer
 * @constructor
 */
function Menu(body, header, footer) {
    this.type = "menu";
    this.body = body;
    this.header = header || null;
    this.footer = footer || null;
}

/**
 * Creates a Menu from a SectionTag
 * @param {SectionTag} sectionTag
 * @returns {Menu}
 */
Menu.fromTag = function (sectionTag) {
    let body = [];

    sectionTag.children.forEach(function (child) {
        if (child instanceof UlTag) {
            child.children.forEach(function (liTag) {
                body.push(MenuItem.fromTag(liTag));
            });
        } else {
            body.push(MenuItem.fromTag(child));
        }
    });

    return new Menu(body, sectionTag.attrs.header, sectionTag.attrs.footer);
};

/**
 * Instantiates a new MenuItem
 * @param type
 * @param description
 * @param method
 * @param path
 * @constructor
 */
function MenuItem(type, description, method, path) {
    this.type = type;
    this.description = description;
    this.method = method || null;
    this.path = path || null;
}

/**
 * Creates a MenuItem from a SectionTag's child
 * @param {LiTag|BrTag|PTag|LabelTag|InputTag|String} tag
 * @returns {MenuItem}
 */
MenuItem.fromTag = function (tag) {
    let menuItem;

    if (tag instanceof String) {
        menuItem = new MenuItem('content', tag, undefined, undefined);
    } else {
        if (tag.attrs.href) {
            menuItem = new MenuItem('option', tag.toString(), tag.attrs.method, tag.attrs.href);
        } else {
            menuItem = new MenuItem('content', tag.toString(), undefined, undefined);
        }
    }
    return menuItem;
};

/**
 * Instantiates a Response object
 * @param {String | undefined} messageId
 * @param {Form | Menu} content
 * @constructor
 */
function Response(content, messageId) {
    if (!content) {
        throw Error('content is mandatory');
    }

    let contentType;
    if (content instanceof Form) {
        contentType = 'form';
    } else if (content instanceof Menu) {
        contentType = 'menu';
    } else {
        throw Error(`Cannot create Response from ${content.constructor}`)
    }

    this.messageId = messageId || null;
    this.contentType = contentType;
    this.content = content;
}

/**
 * Creates a Response from a FormTag or SectionTag
 * @param tag
 * @param messageId
 * @returns {Response}
 */
Response.fromTag = function (tag, messageId) {
    if (tag instanceof FormTag) {
        return new Response(Form.fromTag(tag), messageId);
    } else if (tag instanceof SectionTag) {
        return new Response(Menu.fromTag(tag), messageId);
    } else {
        throw Error(`Cannot create response from ${tag.tagName} tag`)
    }
};

exports.Form = Form;
exports.Response = Response;
