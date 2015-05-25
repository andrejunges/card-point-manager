"use strict";
<<<<<<< HEAD
// app is defined in /app/app.js
appControllers.controller('HomeCtrl', ['$scope', '$http', ($scope, $http) => {
    $scope.opcoes = [{
        caption: 'Usuarios',
        url: '/users'
    },
    {
        caption: 'Funcionarios',
        url: '/employees'
    },
    {
        caption: 'Departamentos',
        url: '/departments'
    }];
}]);
=======
@window.AngularController('HomeCtrl','$http')
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
>>>>>>> origin/master
