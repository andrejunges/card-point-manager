"use strict";
@window.AngularController('EmployeeTableTimeCtrl', '$http')
class EmployeeTableTimeController {
    name = null;
    constructor($scope, $http) {
        this.scope = $scope;
        this.http = $http;

        $('.clockpicker').clockpicker();
    }
}
