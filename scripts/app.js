'use strict';

angular.module('MyApp', ['ngRoute', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/backend', {
        templateUrl: 'views/backend.html',
        controller: 'MainCtrl'
      })
      .when('/backend/:language', {
        templateUrl: function(params) {
          return 'views/' + params.language + '.html';
        }
      })
      .when('/frontend', {
        templateUrl: 'views/frontend.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
