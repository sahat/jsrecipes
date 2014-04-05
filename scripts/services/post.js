angular.module('MyApp')
  .factory('Post', ['Posts', function(Posts) {
    return {
      getPosts: function(callback) {
        callback(Posts);
      },
      getBySlug: function(slug, callback) {
        this.getPosts(function(data) {
          var recursiveGetProperty = function(obj, lookup, callback) {
            for (var property in obj) {
              if (property == lookup) {
                callback(obj);
              } else if (obj[property] instanceof Object) {
                recursiveGetProperty(obj[property], lookup, callback);
              }
            }
          };
          recursiveGetProperty(data, 'slug', function(obj) {
            if (obj.slug === slug) {
              callback(obj);
            }
          });
        })
      }
    }
  }]);
