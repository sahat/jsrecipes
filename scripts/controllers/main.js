angular.module('MyApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$route', '$window', 'Posts', 'GitHub', '$routeParams', 'ngProgress' ,function($scope, $rootScope, $route, $window, Posts, GitHub, $routeParams, ngProgress) {
    $scope.$on('$routeChangeSuccess', function($currentRoute, $previousRoute) {
      if ($routeParams.name) {
        ngProgress.start();
        Posts.getBySlug($routeParams.name, function(post) {
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
        $rootScope.title = $route.current.title;

        Posts.getPosts(function(posts) {
          $scope.posts = posts;
        });

        GitHub.getContributors(function(contributors) {
          $scope.contributors = contributors.slice(0,10);
        });
      }
    });
  }]);
