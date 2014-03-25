angular.module('MyApp')
  .directive('markdown', function($http) {
    var converter = new Showdown.converter();
    return {
      link: function(scope, element, attrs) {
        attrs.$observe('file', function(file) {
          if (file) {
            $http.get('posts/' + file).success(function(response) {
              var htmlText = converter.makeHtml(response);
              element.html(htmlText);
              $('pre code').each(function(i, e) {
                hljs.highlightBlock(e)
              });
            });
          }
        });
      }
    }
  });