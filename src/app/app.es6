"use strict";
var app = angular.module('app', ['ngRoute', 'ngReactGrid', 'appControllers']);
app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider
            .when('/users/', {
                templateUrl: '/users',
                controller: 'UserCtrl'
            })
            .when('/user/form', {
                templateUrl: 'user/form',
                controller: 'UserFormCtrl'
            })
            .when('/employee/tabletime', {
                templateUrl: '/employee/tabletime',
                controller: 'EmployeeTableTime'
            })
            .when('/employees/', {
                templateUrl: '/employees',
                controller: 'EmployeeCtrl'
            })
            .when('/departments/', {
                templateUrl: '/departments',
                controller: 'DepartmentCtrl'
            })
            .otherwise({
                templateUrl: '/home',
                controller: 'HomeCtrl'
            });
  }]);

var appControllers = angular.module('appControllers', []);
