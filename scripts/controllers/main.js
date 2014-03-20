angular.module('MyApp')
  .controller('MainCtrl', function($scope, $window, Posts, $routeParams, ngProgress) {
    $scope.$on('$routeChangeSuccess', function($currentRoute, $previousRoute) {
        if ($routeParams.name) {
          ngProgress.start();
          Posts.getBySlug($routeParams.name, function(data) {
            $scope.page = data;
            ngProgress.complete();
            $window.document.title = $scope.page.title + " - " + 'JS Recipes'
          });
        } else {
          $window.document.title = 'JS Recipes' + " - " + 'Site Description';
          Posts.getPosts(function(data) {
            console.log(data)
            $scope.docs = data;
          });
        }
      });
  });
