var pug = require('pug');
var parse = require('node-html-parser').parse;
var apiServerPath = process.env.API_SERVER_BASE_PATH;
var request = require('request');

exports.Service = function (apiKey, serviceName, callbackPath, verbs) {
    this.apiKey = apiKey;
    this.basePath = apiServerPath;
    this.callbackPath = callbackPath;
    this.serviceName = serviceName;
    this.verbs = verbs || [];
    this.menus = [];
    this.forms = [];
    if (!(this.apiKey && this.basePath && this.callbackPath && this.serviceName )) {
        throw "Invalid parameters or missing base path";
    }
    request({method: "post", url: this.basePath + '/service', json: true, body: {
        apiKey: this.apiKey,
        serviceName: this.serviceName,
        callbackPath: this.callbackPath,
        verbs: this.verbs
    }}, function(error, response, body) {
        if (error) throw error;
        if(response.statusCode !== 200) {
            throw JSON.stringify(response.body,{},4);
        }
    });
}

function Form(index, template, data) {
    this.template = template;
    this.data = data || {};
    this.index = index;
    this.type = "form";
}

Form.prototype.header = function (header) {
    if (arguments.length > 0) {
        if (header && !header.startsWith('#')) {
            this.headerValue = '#' + header.toUpperCase();
        } else if (header && header.startsWith('#')) {
            this.headerValue = header.toUpperCase();
        } else if (typeof header == 'undefined') {
            this.headerValue = undefined;
        }
        return true;
    } else {
        return this.headerValue;
    }
}

Form.prototype.footer = function (footer) {
    if (typeof footer !== 'undefined') {
        this.footerValue = footer;
        return true;
    } else {
        return this.footerValue;
    }
}

Form.prototype.render = function () {

    var self = this;
    var html = pug.renderFile(this.template, this.data);
    var root = parse(html);
    var result = {};

    result.type = this.type;
    result.body = {};
    result.body.formItems = [];
    result.body.nextRoute = root.childNodes[0].attributes['submit'];
    result.body.method = root.childNodes[0].attributes['method'].toUpperCase();

    var form = root.childNodes[0];

    for (var i = 0; i < form.childNodes.length; i++) {
        var record = undefined;
        switch (form.childNodes[i].tagName) {
            case "footer":
                self.footer(root.childNodes[i].text);
                break;
            case "header":
                record = {};
                record.type = "header";
                self.header(root.childNodes[i].text);
                break;
            case "p":
                record = {};
                try {
                    record.description = typeof form.childNodes[i].text !== 'undefined' ?
                        form.childNodes[i].text
                        :
                        undefined;
                    record.name = typeof form.childNodes[i].childNodes[1] !== 'undefined' ?
                        form.childNodes[i].childNodes[1].attributes['name']
                        :
                        undefined;
                    record.type = typeof form.childNodes[i].childNodes[1] !== 'undefined' ?
                        form.childNodes[i].childNodes[1].attributes['type']
                        :
                        undefined;
                } catch (error) {
                    record = {};
                }
                break;
            default:
                break;
        }
        if (record && record.description) result.body.formItems.push(record);
    }

    result.header = this.header();
    result.footer = this.footer();

    console.log("form:");
    console.log(result);

    return result;
}

function Menu(index, template, data) {
    this.template = template;
    this.data = data || {};
    this.index = index;
    this.type = "menu";
}

Menu.prototype.header = function (header) {
    if (arguments.length > 0) {
        if (header && !header.startsWith('#')) {
            this.headerValue = '#' + header.toUpperCase();
        } else if (header && header.startsWith('#')) {
            this.headerValue = header.toUpperCase();
        } else if (typeof header == 'undefined') {
            this.headerValue = undefined;
        }
        return true;
    } else {
        return this.headerValue;
    }
}

Menu.prototype.footer = function (footer) {
    if (arguments.length > 0) {
        this.footerValue = footer;
        return true;
    } else {
        return this.footerValue;
    }
}

Menu.prototype.render = function () {

    var self = this;
    var html = pug.renderFile(this.template, this.data);
    var root = parse(html);
    var result = {};

    result.type = this.type;
    result.body = [];

    for (var i = 0; i < root.childNodes.length; i++) {
        var record = undefined;
        switch (root.childNodes[i].tagName) {
            case "footer":
                self.footer(root.childNodes[i].text);
                break;
            case "header":
                self.header(root.childNodes[i].text);
                break;
            case "option":
                record = {};
                record.type = "option";
                record.description = root.childNodes[i].text;
                record.nextRoute = root.childNodes[i].attributes['href'];
                record.method = typeof root.childNodes[i].attributes['method'] !== 'undefined' ?
                    root.childNodes[i].attributes['method'].toUpperCase()
                    :
                    'GET';
                break;
            case "p":
                record = {};
                record.type = "content";
                record.description = root.childNodes[i].text;
                break;
            default:
                break;
        }
        if (record && record.description) result.body.push(record);
    }
    result.header = this.header();
    result.footer = this.footer();

    console.log("menu:");
    console.log(result);

    return result;
}

exports.Service.prototype.addForm = function (template, data) {
    var form = new Form(this.forms.length, template, data);
    this.forms.push(form);
    return this.forms[this.forms.length - 1];
}

exports.Service.prototype.addMenu = function (template, data) {
    var menu = new Menu(this.menus.length, template, data);
    this.menus.push(menu);
    return this.menus[this.menus.length - 1];
}

