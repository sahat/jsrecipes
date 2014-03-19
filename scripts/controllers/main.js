'use strict';

angular.module('MyApp')
  .controller('MainCtrl', function ($scope, $routeParams) {

    $scope.backend = {
      beginner: [
        'Demo',
        'Hello First post',
        'Second Post',
        'Third Post Foo'
      ],
      intermediate: [],
      advanced: []
    };

    $scope.docUrl = function() {
      return 'docs/' + $routeParams.name + '.md';
    }
  });
