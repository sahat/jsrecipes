'use strict';

angular.module('MyApp')
  .controller('MainCtrl', function($scope, $http, $routeParams) {

    $http.get('docs.json')
      .then(function(res) {
        $scope.backend = res.data.backend;

        var currentPage = _.findWhere($scope.backend.beginner, { slug: $routeParams.name });

        $scope.getTitle = function() {
          return currentPage.title;
        };

        $scope.getDescription = function() {
          return currentPage.description;
        };

        $scope.docUrl = function() {
          return 'docs/' + $routeParams.name + '.md';
        };
      });
  });
