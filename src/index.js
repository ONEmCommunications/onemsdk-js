const pug = require('pug')
const parse = require('node-html-parser').parse

/**
 * Node.js SDK for ONEm API
 @module onem-nodejs-api
*/

/**
 * @typedef {object} Form
 * @property {('form')} type 'Form'
 * @property {string} [header] header value
 * @property {FormBody} body form body object
 * @property {string} [footer] footer value
 */

/**
 * @typedef {object} FormBody
 * @property {Array.FormItem} formItems
 * @property {string} nextRoute
 * @property {('get'|'post'|'put'|'delete')} method HTTP method that should be used when redirecting after successful form submission
 */

/**
 * @typedef {object} FormItem
 * @property {string} description description of the form item which will appear as a prompt to the user
 * @property {string} name name of the form property which will appear in the footer by default
 * @property {('string'|'number'|'date')} type used for field validation 
 */

/**
 * Instantiates a new Service with given name and optional verbs list
 * @constructor
 * @param {string} serviceName name of the service
 */
function Service(serviceName) {

    if (typeof serviceName !== "string") {
        throw "serviceName must be of type string"
    }
    if (!serviceName.match(/^[a-zA-Z0-9]{3,15}$/)) {
        throw "serviceName must be between 3 and 15 characters, be one word only with only numbers and letters"
    }

    this.serviceName = serviceName
    this.menus = []
    this.forms = []
}

/**
 * Instantiates a new Form with given name and optional verbs list
 * @param {number} index index to the array of forms that this form instance references
 * @param {string} template file reference of the pug template
 * @param {object} data form variables for injection
 */
function Form(template, data) {
    this.template = template
    this.data = data || {}
    this.type = "form"
}

/**
 * Getter/setter for a custom form header
 * @param {string} [header] optional value of the header
 * @returns {boolean|string} true indicating header was set or the current value of the header
 */
Form.prototype.header = function (header) {
    if (arguments.length > 0) {
        if (header && !header.startsWith('#')) {
            this.headerValue = '#' + header.toUpperCase()
        } else if (header && header.startsWith('#')) {
            this.headerValue = header.toUpperCase()
        } else if (typeof header == 'undefined') {
            this.headerValue = undefined
        }
        return true
    } else {
        return this.headerValue
    }
}

/**
 * Getter/setter for a custom form footer
 * @param {string} [footer] optional value of the footer
 * @returns {boolean|string} true indicating footer was set or the current value of the footer
 */
Form.prototype.footer = function (footer) {
    if (typeof footer !== 'undefined') {
        this.footerValue = footer
        return true
    } else {
        return this.footerValue
    }
}

/**
 * Processes the pug template for this form using the Form's this.data object as input and returns a JSON object ready for sending on the ONEm connection
 * @returns {Form} JSON object
 */
Form.prototype.render = function () {

    const self = this
    const html = pug.renderFile(this.template, this.data)
    const root = parse(html)
    let result = {}

    result.type = this.type
    result.body = {}
    result.body.formItems = []
    result.body.nextRoute = root.childNodes[0].attributes['submit']
    result.body.method = root.childNodes[0].attributes['method'].toUpperCase()

    const form = root.childNodes[0]

    for (let i = 0; i < form.childNodes.length; i++) {
        let record = undefined
        switch (form.childNodes[i].tagName) {
            case "footer":
                self.footer(root.childNodes[i].text)
                break
            case "header":
                record = {}
                record.type = "header"
                self.header(root.childNodes[i].text)
                break
            case "p":
                record = {}
                try {
                    record.description = typeof form.childNodes[i].text !== 'undefined' ?
                        form.childNodes[i].text
                        :
                        undefined
                    record.name = typeof form.childNodes[i].childNodes[1] !== 'undefined' ?
                        form.childNodes[i].childNodes[1].attributes['name']
                        :
                        undefined
                    record.type = typeof form.childNodes[i].childNodes[1] !== 'undefined' ?
                        form.childNodes[i].childNodes[1].attributes['type']
                        :
                        undefined
                } catch (error) {
                    record = {}
                }
                break
            default:
                break
        }
        if (record && record.description) result.body.formItems.push(record)
    }

    result.header = this.header()
    result.footer = this.footer()

    return result
}

/**
* @typedef {object} Menu
* @property {('menu')} type 'Menu'
* @property {string} [header] header value
* @property {Array.MenuItem} body form body object
* @property {string} [footer] footer value
*/

/**
 * @typedef {object} MenuItem
 * @property {('option'|'content')} type indicating menu option or plain content
 * @property {string} description
 * @property {string} [nextRoute] For menu options only.  Path to be used for HTTP callback (added to base path configured in app's settings in developer portal)
 * @property {('get'|'post'|'put'|'delete')} [method=get] For menu options only.  HTTP method that should be used when redirecting after successful menu option submission
 */


/**
 * Instantiates a new Menu with given name and optional verbs list
 * @param {number} index index to the array of menu items that this form instance references
 * @param {string} template file reference of the pug template
 * @param {object} data form variables for injection
 */
function Menu(template, data) {
    this.template = template
    this.data = data || {}
    this.type = "menu"
}

/**
 * Getter/setter for a custom menu header
 * @param {string} [header] optional value of the header
 * @returns {boolean|string} true indicating header was set or the current value of the header
 */
Menu.prototype.header = function (header) {
    if (arguments.length > 0) {
        if (header && !header.startsWith('#')) {
            this.headerValue = '#' + header.toUpperCase()
        } else if (header && header.startsWith('#')) {
            this.headerValue = header.toUpperCase()
        } else if (typeof header == 'undefined') {
            this.headerValue = undefined
        }
        return true
    } else {
        return this.headerValue
    }
}

/**
 * Getter/setter for a custom menu footer
 * @param {string} [footer] optional value of the footer
 * @returns {boolean|string} true indicating footer was set or the current value of the footer
 */
Menu.prototype.footer = function (footer) {
    if (arguments.length > 0) {
        this.footerValue = footer
        return true
    } else {
        return this.footerValue
    }
}

/**
 * Processes the pug template for this menu using the menu's this.data object as input and returns a JSON object ready for sending on the ONEm connection
 * @returns {Menu} JSON object
 */
Menu.prototype.render = function () {

    const self = this
    const html = pug.renderFile(this.template, this.data)
    const root = parse(html)
    let result = {}

    result.type = this.type
    result.body = []

    for (let i = 0; i < root.childNodes.length; i++) {
        let record = undefined
        switch (root.childNodes[i].tagName) {
            case "footer":
                self.footer(root.childNodes[i].text)
                break
            case "header":
                self.header(root.childNodes[i].text)
                break
            case "option":
                record = {}
                record.type = "option"
                record.description = root.childNodes[i].text
                record.nextRoute = root.childNodes[i].attributes['href']
                record.method = typeof root.childNodes[i].attributes['method'] !== 'undefined' ?
                    root.childNodes[i].attributes['method'].toUpperCase()
                    :
                    'GET'
                break
            case "p":
                record = {}
                record.type = "content"
                record.description = root.childNodes[i].text
                break
            default:
                break
        }
        if (record && record.description) result.body.push(record)
    }
    result.header = this.header()
    result.footer = this.footer()

    return result
}

/**
 * Adds a new form to the service with given pug template and data object
 * @param {string} template reference to the pug template file 
 * @param {object} data form variables for injection 
 * @returns {object} form object that was added
 */
Service.prototype.addForm = function (template, data) {
    const form = new Form(template, data)
    this.forms.push(form)
    return this.forms[this.forms.length - 1]
}

/**
 * Adds a new menu to the service with given pug template and data object
 * @param {string} template reference to the pug template file 
 * @param {object} data menu variables for injection 
 * @returns {object} menu object that was added
 */
Service.prototype.addMenu = function (template, data) {
    const menu = new Menu(template, data)
    this.menus.push(menu)
    return this.menus[this.menus.length - 1]
}

module.exports = {
    Service
}