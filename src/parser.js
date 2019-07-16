const fs = require('fs');
const parser = require('node-html-parser');
const pug = require('pug');

const tags = require('./tag');

function clean(node) {
    for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        if (
            child.nodeType === 8 ||
            (child.nodeType === 3 && !/\S/.test(child.rawText))
        ) {
            node.removeChild(child);
            i--;
        } else if (child.nodeType === 1) {
            clean(child);
        }
    }
}

/**
 * Turns a HTML content (from file or from variable) to a Tag object
 * @param {String | undefined} htmlFile
 * @param {String | undefined} htmlText
 * @returns {FormTag|SectionTag|UlTag|LiTag|ATag|PTag|*}
 */
function loadHtml(htmlFile, htmlText) {
    if (htmlFile) {
        htmlText = fs.readFileSync(htmlFile, 'utf-8');
    }
    let node = parser.parse(htmlText, {lowerCaseTagName: true});
    if (node.tagName === null) {
        node = node.childNodes[0];
    }
    clean(node);
    const tagCls = tags.getTagCls(node.tagName);
    return tagCls.fromNode(node);
}

function loadTemplate(templateFile, data) {
    const htmlText = pug.renderFile(templateFile, data, undefined);
    return loadHtml(undefined, htmlText);
}

exports.loadHtml = loadHtml;
exports.loadTemplate = loadTemplate;
