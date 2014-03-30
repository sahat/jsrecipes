'use strict';

angular.module('MyApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngProgress', 'ngDisqus'])
  .config(function($routeProvider, $locationProvider, $disqusProvider) {
    $disqusProvider.setShortname('jsrecipes');
    $locationProvider.hashPrefix('!');

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
      .when('/contributing', {
        templateUrl: 'views/contributing.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        templateUrl: 'views/404.html'
      });
  });
