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
 * @param {FormItemContent|FormItemMenu} body
 * @param {('GET'|'POST'|'PUT'|'DELETE')} method='POST'
 * @param {string} path
 * @param {string|undefined} header
 * @param {string|undefined} footer
 * @param {FormMeta|undefined} meta
 * @constructor
 */
function Form(body, method, path, header, footer, meta) {
    this.type = 'form';
    this.body = body;
    this.method = method || 'POST';
    this.path = path;
    this.header = header || null;
    this.footer = footer || null;
    this.meta = meta || null;
}

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
 * Instantiates a new FormItemMenu
 * @param {Array<FormItemMenuItem>} body
 * @constructor
 */
function FormItemMenu(body) {
    this.type = 'form-menu';
    this.body = body;
}

/**
 * Instantiates a new FormItemMenuItem
 * @param {string} description
 * @param {string|undefined} value
 * @constructor
 */
function FormItemMenuItem(description, value) {
    this.description = description;
    this.value = value || null;
}

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
 * Instantiates a Response object
 * @param {String | undefined} messageId
 * @param {Form | Menu} content
 * @constructor
 */
function Response(content, messageId) {
    assert(content, 'content is mandatory');

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
