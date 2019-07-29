const ejs = require('ejs');
const fs = require('fs');
const parser = require('node-html-parser');
const path = require('path');
const pug = require('pug');

const tags = require('./tag');
const config = require('./config');

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

function getAbsoluteStaticFilePath(filename) {
    let htmlFilePath;

    if (!path.isAbsolute(filename)) {
        const staticDir = config.getStaticDir();
        if (staticDir) {
            htmlFilePath = path.resolve(staticDir, filename);
        }
    }

    if (!htmlFilePath) {
        htmlFilePath = path.resolve(filename);
    }
    return htmlFilePath;
}

/**
 * Turns a HTML content (from file or from variable) to a Tag object
 * @param {string|undefined} htmlFile
 * @param {string|undefined} htmlText
 * @returns {FormTag|SectionTag|UlTag|LiTag|ATag|PTag|*}
 */
function loadHtml(htmlFile, htmlText) {
    if (htmlFile) {
        const htmlFilePath = getAbsoluteStaticFilePath(htmlFile);
        htmlText = fs.readFileSync(htmlFilePath, 'utf-8');
    }
    let node = parser.parse(htmlText, {lowerCaseTagName: true});
    if (node.tagName === null) {
        node = node.childNodes[0];
    }
    clean(node);
    const tagCls = tags.getTagCls(node.tagName);
    return tagCls.fromNode(node);
}

/**
 * Turns a template file to a Tag object
 * @param {string} templateFile The name of the template file
 * @param {object} data The data to fill the template with
 * @returns {FormTag|SectionTag|UlTag|LiTag|ATag|PTag|*}
 */
function loadTemplate(templateFile, data) {
    let htmlText;

    templateFile = getAbsoluteStaticFilePath(templateFile);

    if (templateFile.endsWith('.pug')) {
        htmlText = pug.renderFile(templateFile, data, undefined);
    } else if (templateFile.endsWith('.ejs')) {
        const templateText = fs.readFileSync(templateFile, 'utf-8');
        htmlText = ejs.render(templateText, data, {filename: templateFile});
    } else {
        throw Error('Template file type not recognized.');
    }
    return loadHtml(undefined, htmlText);
}

exports.loadHtml = loadHtml;
exports.loadTemplate = loadTemplate;
