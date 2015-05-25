'use strict';
window.AngularController = function() {
    var controllerAppName = arguments[0];
    return function (target, name, descriptor) {
        window[controllerAppName].controller('HomeCtrl', ['$scope', '$http', target]);
        return target;
    };
}
