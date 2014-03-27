'use strict';

angular.module('MyApp', ['ngRoute', 'ui.bootstrap', 'ngProgress'])
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
        templateUrl: 'views/detail.html',
        controller: 'MainCtrl'
      })
      .when('/general/:name', {
        templateUrl: 'views/detail.html',
        controller: 'MainCtrl'
      })
      .when('/feedback', {
        templateUrl: 'views/feedback.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
