"use strict";
var app = angular.module('app', ['ngRoute', 'ngReactGrid', 'appControllers']);
app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider
            .when('/users/', {
                templateUrl: '/users',
                controller: 'UserCtrl'
            })
            .when('/users/form', {
                templateUrl: 'users/form',
                controller: 'UserFormCtrl'
            })
            .when('/employees/', {
                templateUrl: '/employees',
                controller: 'EmployeeCtrl'
            })
            .otherwise({
                templateUrl: '/home',
                controller: 'HomeCtrl'
            });
  }]);

var appControllers = angular.module('appControllers', []);
