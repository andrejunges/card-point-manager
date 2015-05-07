exports.name = 'customHelpers.js';
exports.version = '1.0';
var fs = require('fs');
var pathN = require('path');
require("babel/register");

//now babel will covert all to es5
var lib = require('../Lib/Lib.js'),
    extJs = '.js',
    extCss = '.css';

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
            var path = name;
            if (path.lastIndexOf(extJs) === -1) {
                path += extJs;
            }
            self.repository['$head'] += lib.createScript(path);
        }
        return '';
    }
    framework.helpers.Styles = function (name) {
        var self = this;

        if (typeof (name) == 'object') {
            var leng = name.length;
            if (leng > 1) {
                for (var i = 0; i < leng; i++)
                    framework.helpers.Styles.call(self, name[i]);
            }
            return '';
        }

        if (!self.repository['$head']) {
            self.repository['$head'] = '';
        }
        if (name) {
            var path = 'css/' + name;

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
