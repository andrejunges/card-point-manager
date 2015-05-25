"use strict";
@window.AngularController('HomeCtrl', '$http')
class HomeController {
    name = null;
    constructor($scope, $http) {
        this.scope = $scope;
        this.http = $http;

        this.scope.opcoes = [{
                caption: 'Usuarios',
                url: '/users'
    },
            {
                caption: 'Funcionarios',
                url: '/employees'
        }];
    }
}
