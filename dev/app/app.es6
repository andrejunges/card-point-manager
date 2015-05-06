"use strict";
var app = angular.module('app', ['ngRoute', 'appControllers']);
app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/users', {
                templateUrl: 'users/',
                controller: 'UserCtrl'
            })
            .otherwise({
                redirectTo: '/',
                templateUrl: 'app.html',
                controller: 'HomeCtrl'
            });
  }]);

var appControllers = angular.module('appControllers', []);
