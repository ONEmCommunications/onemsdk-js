var pug = require('pug');
var parse = require('node-html-parser').parse;

exports.Service = function (apiKey, serviceName, verbs) {
    this.apiKey = apiKey;
    this.serviceName = serviceName;
    this.verbs = verbs;
}

exports.Service.prototype.renderMenu = function (template, data) {
    var html = pug.renderFile(template, data);
    var root = parse(html);
    var result = {};

    var body = [];
    for (var i = 0; i < root.childNodes.length; i++) {
        var record = undefined;
        switch (root.childNodes[i].tagName) {
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
        if (record) body.push(record);
    }
    result.json = body;
    return result;
}

exports.Service.prototype.renderForm = function (template, data) {
    var html = pug.renderFile(template, data);
    var result = { json: html2json(html) }
    return result;
}
