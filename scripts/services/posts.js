angular.module('MyApp')
  .factory('Posts', function($http) {
    return{
      getPosts: function(callback) {
        $http.get('posts/posts.json').success(callback);
      },
      getBySlug: function(slug, callback) {
        this.getPosts(function(data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].slug === slug) {
              callback(data[i]);
            }
          }
        })
      }
    }
  });
