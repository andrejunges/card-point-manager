"use strict";
@window.AngularController('EmployeeCtrl', '$http', '$location')
class EmployeeController {
    name = null;
    constructor($scope, $http, $location) {
        this.scope = $scope;
        this.http = $http;
        this.location = $location;

        this.scope.employees_grid = {
            data: [],
            height: 'auto',
            columnDefs: [
                {
                    field: "Name",
                    displayName: "Nome"
                },
                {
                    field: "Department",
                    displayName: "Department"
                }]
        };

        this.scope.newEmployee = function() {
            this.location.path('/employee/form');
        }

        this.http.get('/employees/fetch')
            .success(function (data, status, headers, config) {
                $scope.employees_grid.data = data;
            })
            .error(function (data, status, headers, config) {
                console.log(data, 'data employees');
            });
    }
}
