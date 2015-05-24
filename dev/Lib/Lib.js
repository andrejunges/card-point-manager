'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createScript = createScript;
exports.createStyle = createStyle;

function createScript(url) {
    return '<script type="text/javascript" src="' + url + '"></script>';
}

function createStyle(url) {
    return '<link rel="stylesheet" href="' + url + '">';
}
