const assert = require("chai").assert;
const config = require('../src/config');

describe('Test config', function () {
    it('should set the staticDir correctly', function () {
        config.setStaticDir('/etc');
        assert.strictEqual(config.getStaticDir(), '/etc');
    });

    it('should throw error for non existing paths', function () {
        function iThrow() {
            config.setStaticDir('/no/existing/path');
        }

        assert.throws(iThrow, Error, '/no/existing/path is not a directory');
    });

    it('should throw error for non directory paths', function () {
        function iThrow() {
            config.setStaticDir('non-existing.file');
        }

        assert.throws(iThrow, Error, `${process.cwd() + '/non-existing.file'} is not a directory`);
    });
});
