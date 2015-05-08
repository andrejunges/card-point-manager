"use strict";
var app = angular.module('app', ['ngRoute', 'appControllers', 'ui.grid']);
app.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
    when('/users/', {
        templateUrl: '/users',
        controller: 'UserCtrl'
      })
      .otherwise({
        templateUrl: '/home',
        controller: 'HomeCtrl'
      });
  }]);


var appControllers = angular.module('appControllers', []);
