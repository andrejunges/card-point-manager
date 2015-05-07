"use strict";
// app is defined in /app/app.js
appControllers.controller('HomeCtrl', ['$scope', '$http', ($scope, $http) => {
    $scope.opcoes = [{
            caption: 'Usuarios',
            url: '/users'
    },
        {
            caption: 'Funcionarios',
            url: '/employees'
        }];
}]);
