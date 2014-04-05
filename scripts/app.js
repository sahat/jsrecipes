angular.module('MyApp', ['ngRoute', 'ngProgress', 'ngDisqus', 'ngTable'])
  .config(['$routeProvider', '$locationProvider', '$disqusProvider', function($routeProvider, $locationProvider, $disqusProvider) {
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
        controller: 'MainCtrl',
        title: 'Feedback'
      })
      .when('/contribute', {
        templateUrl: 'views/contribute.html',
        controller: 'MainCtrl',
        title: 'Contribute'
      })
      .otherwise({
        templateUrl: 'views/404.html',
        controller: 'MainCtrl',
        title: 'Not Found'
      });
  }]);
