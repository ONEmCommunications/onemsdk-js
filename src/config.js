let path = require('path');
let fs = require('fs');

let static_dir;

module.exports.setStaticDir = function (staticDir) {
    const dir = path.resolve(staticDir);

    let isDir;

    try {
        isDir = fs.statSync(dir).isDirectory();
    } catch (e) {
        isDir = false;
    }

    if (!isDir) {
        throw Error(`${dir} is not a directory`);
    }
    static_dir = dir;
};

module.exports.getStaticDir = function () {
    return static_dir;
};