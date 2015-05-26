"use strict";
@window.AngularController('UserCtrl', '$http', '$location')
class UserController {
    name = null;
    constructor($scope, $http, $location) {
        this.scope = $scope;
        this.http = $http;
        this.location = $location;

        this.scope.newUser = function () {
            this.location.path('/user/form');
        };

        this.scope.users_grid = {
            data: [],
            height: 'auto',
            columnDefs: [
                {
                    field: "Name",
                    displayName: "Nome"
                        },
                {
                    field: "Login",
                    displayName: "Usuario"
                }]
        };

        this.http.get('/users/fetch')
            .success(function (data, status, headers, config) {
                $scope.users_grid.data = data;
            })
            .error(function (data, status, headers, config) {
                console.log(data, 'data users');
            });
    }
}
