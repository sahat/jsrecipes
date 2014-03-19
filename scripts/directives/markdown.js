angular.module('MyApp')
  .directive('markdown', function() {
    var converter = new Showdown.converter();
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var html = converter.makeHtml(element.text());
        element.html(html);
      }
    }
  });