"use strict";
// app is defined in /app/app.js
appControllers.controller('UserCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.users = [];
  $http.get('/users/fetch').success(function (data, status, headers, config) {
    $scope.users = data;
    $scope.$digest();
  }).
  error(function (data, status, headers, config) {
    console.log(data, 'data users');
  });
}]);
