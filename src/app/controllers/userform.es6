"use strict";
@window.AngularController('UserFormCtrl', '$http', '$location')
class UserFormController {
    name = null;
    constructor($scope, $http, $location) {
        this.scope = $scope;
        this.http = $http;
        this.location = $location;
        this.scope.user = {};

        var user_id = $location.search().id;
        if (user_id) {

        } else {
            this.http.get('user/new')
                .success(function (data, status, headers, config) {
                    $scope.user = data;
                }).error(function (data, status, headers, config) {
                    //todo
                });
        }

        this.scope.save = function () {
            $http.post('user/save', $scope.user)
                .success(function (data, status) {
                    $location.path('/users');
                })
                .error(function (err, status) {
                    //todo
                });
        };
    }
}
