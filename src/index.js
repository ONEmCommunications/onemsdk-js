const snakecase = require('snakecase-keys');
const tags = require('./tag');
const UlTag = tags.UlTag,
    SectionTag = tags.SectionTag,
    FormTag = tags.FormTag,
    LiTag = tags.LiTag,
    ATag = tags.ATag,
    HeaderTag = tags.HeaderTag,
    FooterTag = tags.FooterTag,
    InputTag = tags.InputTag;


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
 * @property {('string'|'date'|'datetime')} type
 * @property {string} name
 * @property {string} description
 * @property {string|undefined} header
 * @property {string|undefined} footer
 */

/**
 * @typedef {Object} FormItemMenu
 * @property {('form-menu')} type
 * @property {Array<FormItemMenuItem>} body
 * @property {string} name
 * @property {string|undefined} header
 * @property {string|undefined} footer
 * @property {FormItemMenuMeta|undefined} meta
 */

/**
 * @typedef {Object} FormItemMenuMeta
 * @property {boolean} autoSelect
 * @property {boolean} multiSelect
 * @property {boolean} numbered
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
 * @property {MenuMeta|undefined} meta
 */

/**
 * @typedef {Object} MenuMeta
 * @property {boolean} autoSelect
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
 * @property {('form'|'menu')} contentType
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
        formTag.attrs.action,
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
    if (typeof completionStatusShow === 'boolean') {
        this.completionStatusShow = completionStatusShow;
    } else {
        this.completionStatusShow = completionStatusShow !== undefined;
    }

    if (typeof completionStatusInHeader === 'boolean') {
        this.completionStatusInHeader = completionStatusInHeader;
    } else {
        this.completionStatusInHeader = completionStatusInHeader !== undefined;
    }

    if (typeof confirmationNeeded === 'boolean') {
        this.confirmationNeeded = confirmationNeeded;
    } else {
        this.confirmationNeeded = confirmationNeeded !== undefined;
    }
}

/**
 * Instantiates a new FormItemContent
 * @param {('string'|'date'|'datetime')} type
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
    let type,
        header,
        footer;

    sectionTag.children.forEach(function (child) {
        if (child instanceof InputTag) {
            type = child.attrs.type;
        }
    });

    if (!type) {
        throw Error('When <section> plays the role of a form item content, ' +
            'it must contain a <input/>')
    }

    // Translate the InputTag type to FormItemContent type
    switch (type) {
        case 'text':
            type = 'string';
            break;
        case 'date':
        case 'datetime':
            // These are the same
            break;
        default:
            throw Error(`<input/> type "#{type}" is not supported`);
    }

    if (sectionTag.children[0] instanceof HeaderTag) {
        header = sectionTag.children[0].toString();
    }
    if (sectionTag.children[sectionTag.children.length - 1] instanceof FooterTag) {
        footer = sectionTag.children[sectionTag.children.length - 1].toString();
    }

    return new FormItemContent(
        type,
        sectionTag.attrs.name,
        sectionTag.toString(true, true),
        header || sectionTag.attrs.header,
        footer || sectionTag.attrs.footer,
    );
};

/**
 * Instantiates a new FormItemMenu
 * @param {Array<FormItemMenuItem>} body
 * @param {string} name
 * @param {string|undefined} header
 * @param {string|undefined} footer
 * @param {FormItemMenuMeta|undefined} meta
 * @constructor
 */
function FormItemMenu(body, name, header, footer, meta) {
    this.type = 'form-menu';
    this.body = body;
    this.name = name;
    this.header = header || null;
    this.footer = footer || null;
    this.meta = meta || null;
}

/**
 * Creates a FormItemMenu from a SectionTag
 * @param {SectionTag} sectionTag
 * @returns {FormItemMenu}
 */
FormItemMenu.fromTag = function (sectionTag) {
    let body = [],
        header,
        footer;

    sectionTag.children.forEach(function (child) {
        if (child instanceof UlTag) {
            child.children.forEach(function (liTag) {
                body.push(FormItemMenuItem.fromTag(liTag));
            })
        } else if (child instanceof HeaderTag) {
            header = child.toString();
        } else if (child instanceof FooterTag) {
            footer = child.toString();
        } else {
            body.push(FormItemMenuItem.fromTag(child));
        }
    });

    // Discard all the menu items evaluated to false (eg: those with no description)
    body = body.filter(function (menuItem) {
        return menuItem;
    });

    return new FormItemMenu(
        body,
        sectionTag.attrs.name,
        header || sectionTag.attrs.header,
        footer || sectionTag.attrs.footer,
        new FormItemMenuMeta(
            sectionTag.attrs.autoSelect,
            sectionTag.attrs.multiSelect,
            sectionTag.attrs.numbered,
        )
    );
};

/**
 * Instantiates a new FormItemMenuMeta
 * @param {boolean} autoSelect
 * @param {boolean} multiSelect
 * @param {boolean} numbered
 * @constructor
 */
function FormItemMenuMeta(autoSelect, multiSelect, numbered) {
    this.autoSelect = autoSelect;
    this.multiSelect = multiSelect;
    this.numbered = numbered;
}

/**
 * Instantiates a new FormItemMenuItem
 * @param {('option'|'content')} type
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
    let description,
        type = 'content',
        value;

    if (typeof tag === 'string') {
        description = tag;
    } else {
        description = tag.toString();
    }

    if (!description) {
        // Ignore the menu items without text
        return undefined;
    }

    if (tag instanceof LiTag && tag.attrs.value) {
        type = 'option';
        value = tag.attrs.value;
    }

    return new FormItemMenuItem(type, description, value);
};

/**
 * Instantiates a new Menu
 * @param {Array<MenuItem>} body
 * @param {string|undefined} header
 * @param {string|undefined} footer
 * @param {MenuMeta} meta
 * @constructor
 */
function Menu(body, header, footer, meta) {
    this.type = "menu";
    this.body = body;
    this.header = header || null;
    this.footer = footer || null;
    this.meta = meta || null;
}

/**
 * Creates a Menu from a SectionTag
 * @param {SectionTag} sectionTag
 * @returns {Menu}
 */
Menu.fromTag = function (sectionTag) {
    let body = [],
        header,
        footer;

    sectionTag.children.forEach(function (child) {
        if (child instanceof UlTag) {
            child.children.forEach(function (liTag) {
                body.push(MenuItem.fromTag(liTag));
            });
        } else if (child instanceof HeaderTag) {
            header = child.toString();
        } else if (child instanceof FooterTag) {
            footer = child.toString();
        } else {
            body.push(MenuItem.fromTag(child));
        }
    });

    // Discard all the menu items evaluated to false (eg: those with no description)
    body = body.filter(function (menuItem) {
        return menuItem;
    });

    return new Menu(
        body,
        header || sectionTag.attrs.header,
        footer || sectionTag.attrs.footer,
        new MenuMeta(sectionTag.attrs.autoSelect)
    );
};

/**
 * Instantiates a new MenuMeta
 * @param {boolean} autoSelect
 * @constructor
 */
function MenuMeta(autoSelect) {
    this.autoSelect = autoSelect;
}

/**
 * Instantiates a new MenuItem
 * @param {('option'|'content')} type
 * @param {string} description
 * @param {('GET'|'POST'|'PUT'|'DELETE'|undefined)} method
 * @param {string|undefined} path
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
 * @param {LiTag|BrTag|PTag|LabelTag|InputTag|string} tag
 * @returns {MenuItem}
 */
MenuItem.fromTag = function (tag) {
    let description,
        method,
        path,
        type = 'content';

    if (typeof tag === 'string') {
        description = tag;
    } else {
        description = tag.toString();
    }

    if (!description) {
        // Ignore the menu items without text
        return undefined;
    }

    if (tag instanceof LiTag && tag.children[0] instanceof ATag) {
        const aTag = tag.children[0];
        method = aTag.attrs.method;
        path = aTag.attrs.href;
        type = 'option';
    }

    return new MenuItem(type, description, method, path);
};

/**
 * Instantiates a Response object
 * @param {Form|Menu} content
 * @constructor
 */
function Response(content) {
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

    this.contentType = contentType;
    this.content = content;
}

/**
 * Creates a Response from a FormTag or SectionTag
 * @param {FormTag|SectionTag} tag
 * @returns {Response}
 */
Response.fromTag = function (tag) {
    if (tag instanceof FormTag) {
        return new Response(Form.fromTag(tag));
    } else if (tag instanceof SectionTag) {
        return new Response(Menu.fromTag(tag));
    } else {
        throw Error(`Cannot create response from ${tag.tagName} tag`)
    }
};

Response.prototype.toJSON = function () {
    return snakecase(this);
};


exports.Form = Form;
exports.Response = Response;
exports.Menu = Menu;
exports.MenuItem = MenuItem;
exports.FormItemMenu = FormItemMenu;
exports.FormItemMenuItem = FormItemMenuItem;
exports.FormItemContent = FormItemContent;
exports.FormMeta = FormMeta;
exports.MenuMeta = MenuMeta;
exports.FormItemMenuMeta = FormItemMenuMeta;

exports.parser = require('./parser');
exports.tags = require('./tag');
exports.config = require('./config');
