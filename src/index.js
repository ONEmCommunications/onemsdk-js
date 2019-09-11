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
 * @property {Array<FormItem>} body form body object
 */

/**
 * @typedef {object} FormMeta
 * @property {boolean|undefined} completionStatusShow
 * @property {boolean|undefined} completionStatusInHeader
 * @property {boolean|undefined} confirmationNeeded
 */

/**
 * @typedef {object} FormItem
 * @property {('string'|'date'|'datetime')} type
 * @property {string} name
 * @property {string} description
 * @property {string|undefined} header
 * @property {string|undefined} footer
 */

/**
 * @typedef {Object} MenuFormItemMeta
 * @property {boolean} autoSelect
 * @property {boolean} multiSelect
 * @property {boolean} numbered
 */

/**
 * @typedef {object} MenuItemFormItem
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
 * @param {Array<FormItem>} body
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
    for (const sectionTag of formTag.children) {
        body.push(FormItem.fromTag(sectionTag));
    }

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
 * Instantiates a new FormItem
 * @param {('string'|'date'|'datetime'|'int'|'float'|'hidden'|'form-menu')} type
 * @param {string} name
 * @param {string} description
 * @param {string|undefined} header
 * @param {string|undefined} footer
 * @param {Array<MenuItemFormItem>} [body]
 * @param {string} [value]
 * @param {string} [chunkingFooter]
 * @param {string} [confirmationLabel]
 * @param {number} [minLength] must be int
 * @param {string} [minLengthError]
 * @param {number} [maxLength] must be int
 * @param {string} [maxLengthError]
 * @param {number} [minValue]
 * @param {string} [minValueError]
 * @param {number} [maxValue]
 * @param {string} [maxValueError]
 * @param {MenuFormItemMeta} [meta]
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
function FormItem(type, name, description, header, footer, body, value, chunkingFooter,
                  confirmationLabel, minLength, minLengthError, maxLength,
                  maxLengthError, minValue, minValueError, maxValue, maxValueError,
                  meta, method, required, statusExclude, statusPrepend, url,
                  validateTypeError, validateTypeErrorFooter, validateUrl) {
    this.type = type;
    this.name = name;
    this.description = description;
    this.header = header || null;
    this.footer = footer || null;
    this.body = body || null;
    this.value = value || null;
    this.chunkingFooter = chunkingFooter || null;
    this.confirmationLabel = confirmationLabel || null;
    this.minLength = minLength || null;
    this.minLengthError = minLengthError || null;
    this.maxLength = maxLength || null;
    this.maxLengthError = maxLengthError || null;
    this.minValue = minValue || null;
    this.minValueError = minValueError || null;
    this.maxValue = maxValue || null;
    this.maxValueError = maxValueError || null;
    this.meta = meta || null;
    this.method = method || null;
    this.required = required || false;
    this.statusExclude = statusExclude || false;
    this.statusPrepend = statusPrepend || false;
    this.url = url || null;
    this.validateTypeError = validateTypeError || null;
    this.validateTypeErrorFooter = validateTypeErrorFooter || null;
    this.validateUrl = validateUrl || null;
}

/**
 * Creates a FormItem from a SectionTag
 * @param {SectionTag} sectionTag
 * @returns {FormItem}
 */
FormItem.fromTag = function (sectionTag) {
    let header,
        footer,
        body = [],
        value,
        minValue,
        minValueError,
        minLength,
        minLengthError,
        maxValue,
        maxValueError,
        maxLength,
        maxLengthError,
        formItemType;

    for (const child of sectionTag.children) {
        if (child instanceof InputTag) {
            const inputType = child.attrs.type;
            if (inputType === 'number') {
                if (child.attrs.step === 1) {
                    formItemType = 'int';
                } else {
                    formItemType = 'float';
                }
            } else if (inputType === 'hidden') {
                value = child.attrs.value;
                formItemType = 'hidden';
                if (value === undefined) {
                    throw Error('value attribute is required for input type="hidden"');
                }
            } else {
                switch (inputType) {
                    case 'text':
                        formItemType = 'string';
                        break;
                    case 'date':
                        formItemType = 'date';
                        break;
                    case 'datetime':
                        formItemType = 'datetime';
                        break;
                    default:
                        throw Error(`<input/> type "#{type}" is not supported`);
                }
            }

            minValue = child.attrs.min;
            minValueError = child.attrs.minError;
            minLength = child.attrs.minlength;
            minLengthError = child.attrs.minlengthError;
            maxValue = child.attrs.max;
            maxValueError = child.attrs.maxError;
            maxLength = child.attrs.maxlength;
            maxLengthError = child.attrs.maxlengthError;

            break; // ignore other <input> tags if exist
        }
        if (child instanceof UlTag) {
            formItemType = 'form-menu';
            for (const li of child.children) {
                body.push(MenuItemFormItem.fromTag(li));
            }
            break;
        }
    }

    if (!formItemType) {
        throw Error('When <section> plays the role of a form item, ' +
            'it must contain a <input/> or <ul></ul>'
        )
    }

    if (sectionTag.children[0] instanceof HeaderTag) {
        header = sectionTag.children[0].toString();
    }
    if (sectionTag.children[sectionTag.children.length - 1] instanceof FooterTag) {
        footer = sectionTag.children[sectionTag.children.length - 1].toString();
    }

    return new FormItem(
        formItemType,
        sectionTag.attrs.name,
        sectionTag.toString(true, true),
        header || sectionTag.attrs.header,
        footer || sectionTag.attrs.footer,
        body.length === 0 ? undefined : body,
        value,
        sectionTag.attrs.chunkingFooter,
        sectionTag.attrs.confirmationLabel,
        minLength,
        minLengthError,
        maxLength,
        maxLengthError,
        minValue,
        minValueError,
        maxValue,
        maxValueError,
        new MenuFormItemMeta(
            sectionTag.attrs.autoSelect,
            sectionTag.attrs.multiSelect,
            sectionTag.attrs.numbered
        ),
        sectionTag.attrs.method,
        sectionTag.attrs.required,
        sectionTag.attrs.statusExclude,
        sectionTag.attrs.statusPrepend,
        sectionTag.attrs.url,
        sectionTag.attrs.validateTypeError,
        sectionTag.attrs.validateTypeErrorFooter,
        sectionTag.attrs.validateUrl
    );
};


/**
 * Instantiates a new MenuFormItemMeta
 * @param {boolean} [autoSelect=false]
 * @param {boolean} [multiSelect=false]
 * @param {boolean} [numbered=false]
 * @constructor
 */
function MenuFormItemMeta(autoSelect, multiSelect, numbered) {
    this.autoSelect = autoSelect || false;
    this.multiSelect = multiSelect || false;
    this.numbered = numbered || false;
}

/**
 * Instantiates a new MenuItemFormItem
 * @param {string} description
 * @param {string} [textSearch]
 * @param {string} [value]
 * @constructor
 */
function MenuItemFormItem(description, value, textSearch) {
    if (value !== undefined) {
        this.type = 'option';
    } else {
        this.type = 'content';
    }
    this.description = description;
    this.value = value || null;
    this.textSearch = textSearch || null;
}

/**
 * Creates a MenuItemFormItem from a SectionTag's child
 * @param tag
 * @returns {MenuItemFormItem}
 */
MenuItemFormItem.fromTag = function (tag) {
    let description,
        textSearch,
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

    if (tag instanceof LiTag) {
        value = tag.attrs.value;
        textSearch = tag.attrs.textSearch;
    }

    return new MenuItemFormItem(description, value, textSearch);
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
 * @param {boolean} [autoSelect=false]
 * @constructor
 */
function MenuMeta(autoSelect) {
    this.autoSelect = autoSelect || false;
}

/**
 * Instantiates a new MenuItem
 * @param {string} description
 * @param {string} [textSearch]
 * @param {('GET'|'POST'|'PUT'|'PATCH'|'DELETE'|'HEAD'|'OPTIONS'|'TRACE')} [method]
 * @param {string} [path]
 * @constructor
 */
function MenuItem(description, textSearch, method, path) {
    if (path !== undefined) {
        this.type = 'option';
    } else {
        this.type = 'content';
    }
    this.description = description;
    this.textSearch = textSearch || null;
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
        textSearch,
        path;

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
        textSearch = tag.attrs.textSearch;
    }

    return new MenuItem(description, textSearch, method, path);
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
exports.MenuItemFormItem = MenuItemFormItem;
exports.FormItem = FormItem;
exports.FormMeta = FormMeta;
exports.MenuMeta = MenuMeta;
exports.MenuFormItemMeta = MenuFormItemMeta;

exports.parser = require('./parser');
exports.tags = require('./tag');
exports.config = require('./config');
