'use strict';

angular.module('MyApp', ['ngRoute', 'ui.bootstrap', 'slugifier'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/backend/:name', {
        templateUrl: 'views/detail.html',
        controller: 'MainCtrl'
      })
      .when('/frontend/:name', {
        templateUrl: 'views/frontend.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
