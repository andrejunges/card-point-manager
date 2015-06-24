"use strict";
@window.AngularController('DepartmentCtrl', '$http', '$location')
class DepartmentController {
    constructor($scope, $http, $location) {
        this.scope = $scope;
        this.http = $http;
        this.location = $location;

        this.scope.departments_grid = {
            data: [],
            height: 'auto',
            columnDefs: [
                {
                    field: "_id",
                    displayName: "id"
                },
                {
                    field: "Description",
                    displayName: "Description"
                }]
        };

        this.scope.newDepartment = function () {
            this.location.path('/deparment/form');
        };

        this.http.get('/departments/fetch')
            .success(function (data, status, headers, config) {
                $scope.departments_grid.data = data;
            })
            .error(function (data, status, headers, config) {
                console.log(data, 'data users');
            });
    }
}
