angular.module('MyApp')
  .directive('metisMenu', function () {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $(element).metisMenu();
      }
    }
  });
