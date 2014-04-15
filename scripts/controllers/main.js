angular.module('MyApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$route', '$window', 'Post', 'GitHub', '$routeParams', 'ngProgress' ,function($scope, $rootScope, $route, $window, Post, GitHub, $routeParams, ngProgress) {
    $scope.$on('$routeChangeSuccess', function($currentRoute, $previousRoute) {
      if ($routeParams.name) {
        ngProgress.start();
        Post.getBySlug($routeParams.name, function(post) {
          $scope.post = post;
          ngProgress.complete();
          $window.document.title = $scope.post.title + " - " + 'JS Recipes'

          // Get last commit date
          GitHub.lastCommit(post.file, function(data, status, headers, config) {
            if (status === 0) return $scope.lastUpdated = 'Unknown';
            $scope.lastUpdated = new Date(data[0].commit.committer.date).toLocaleString();
          });
        });
      } else {
        $window.document.title = $route.current.title ? $route.current.title + " - " + 'JS Recipes' : 'JS Recipes';

        $rootScope.title = $route.current.title;

        Post.getPosts(function(posts) {
          $scope.posts = posts;
        });

        GitHub.getContributors(function(contributors) {
          $scope.contributors = contributors.slice(0,10);
        });
      }
    });
  }]);
