angular.module('MyApp')
  .factory('GitHub', function($http) {
    return {
      lastCommit: function(file, callback) {
        $http.get('https://api.github.com/repositories/17648824/commits?path=posts/' + file)
          .success(callback)
          .error(callback)
      }
    }
  });
