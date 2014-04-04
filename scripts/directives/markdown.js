angular.module('MyApp')
  .directive('markdown', ['$http', '$compile', function($http, $compile) {
    var converter = new Showdown.converter();
    return {
      link: function(scope, element, attrs) {
        attrs.$observe('file', function(file) {
          if (file) {
            $http.get('posts/' + file).success(function(response) {
              var htmlText = converter.makeHtml(response);
              element.html(htmlText);
              $compile(element.contents())(scope);
              $('pre code').each(function(i, e) {
                hljs.highlightBlock(e);
              });
            });
          }
        });
      }
    }
  }]);