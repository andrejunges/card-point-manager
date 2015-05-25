'use strict';
window.AngularController = function() {
    var controllerName = arguments[0];
    var depInjectios = ['$scope'];
    for(var index = 1; index < arguments.length; index++){
        depInjectios.push(arguments[index]);
    }
    return function (target, name, descriptor) {
        depInjectios.push(target);
        window.appControllers.controller(controllerName, depInjectios);
        return target;
    };
}
