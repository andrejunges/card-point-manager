exports.name = 'customHelpers.js';
exports.version = '1.0';
var fs = require('fs');
var pathN = require('path');
require("babel/register");
//now babel will covert all to es5
var lib = require('../Lib/Lib.js');
var extJs = '.js';
var extCss = '.css';

exports.install = function (framework, options) {

    framework.helpers.Scripts = function (name) {
        var self = this;
        var length = arguments.length;
        if (length > 1) {
            for (var i = 0; i < length; i++)
                framework.helpers.Scripts.call(self, arguments[i]);
            return '';
        }
        if (!self.repository['$head']) {
            self.repository['$head'] = '';
        }
        if (name) {
            var path = 'js/' + name;
            if (path.lastIndexOf(extJs) === -1) {
                path += extJs;
            }
            var resolvedPath = pathN.resolve(__dirname + '/../public/' + path);

            if (fs.existsSync(resolvedPath)) {
                self.repository['$head'] += lib.createScript(path);
            } else {
                console.warn(resolvedPath, 'not found!!');
            }
        }
        return '';
    }
    framework.helpers.Styles = function (name) {
        var self = this;
        var length = arguments.length;
        if (length > 1) {
            for (var i = 0; i < length; i++)
                framework.helpers.Styles.call(self, arguments[i]);
            return '';
        }
        if (!self.repository['$head']) {
            self.repository['$head'] = '';
        }
        if (name) {
            var path = 'css/' + name + extCss;
            if (path.lastIndexOf(extCss) === -1) {
                path += extCss;
            }
            self.repository['$head'] += lib.createStyle(path);
        }
        return '';
    }
}

exports.uninstall = function (framework) {
    delete framework.helpers.Scripts;
    delete framework.helpers.Styles;
};
