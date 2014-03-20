angular.module('MyApp')
  .factory('Docs', function($http) {
    return{
      getDocs: function(callback) {
        $http.get('/docs/docs.json').success(callback);
      },
      getBySlug: function(slug, callback) {
        this.getDocs(function(data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].slug === slug) {
              callback(data[i]);
            }
          }
        })
      }
    }
  });
