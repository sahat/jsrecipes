angular.module('MyApp')
  .controller('MainCtrl', function($scope, $window, Posts, $routeParams, ngProgress) {
    $scope.$on('$routeChangeSuccess', function($currentRoute, $previousRoute) {
        if ($routeParams.name) {
          ngProgress.start();
          Posts.getBySlug($routeParams.name, function(data) {
            $scope.post = data;
            ngProgress.complete();
            $window.document.title = $scope.post.title + " - " + 'JS Recipes'
          });
        } else {
          $window.document.title = 'JS Recipes' + " - " + 'Site Description';
          Posts.getPosts(function(data) {
            $scope.posts = data;
          });
        }
      });
  });
