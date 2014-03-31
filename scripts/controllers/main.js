angular.module('MyApp')
  .controller('MainCtrl', function($scope, $window, Posts, GitHub, $routeParams, ngProgress) {
    $scope.$on('$routeChangeSuccess', function($currentRoute, $previousRoute) {
        if ($routeParams.name) {
          ngProgress.start();
          Posts.getBySlug($routeParams.name, function(post) {
            $scope.post = post;
            ngProgress.complete();
            $window.document.title = $scope.post.title + " - " + 'JS Recipes'

            // Get last commit date
            GitHub.lastCommit(post.file, function(data) {
              $scope.lastUpdated = new Date(data[0].commit.committer.date).toLocaleString();
            });
          });
        } else {
          $window.document.title = 'JS Recipes' + " - " + 'Site Description';
          Posts.getPosts(function(data) {
            $scope.posts = data;
          });
        }
      });
  });
