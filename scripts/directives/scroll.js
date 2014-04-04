angular.module('MyApp')
  .directive('scroll', ['$window', function($window) {
    return function(scope, element, attrs) {
      angular.element($window).bind('scroll', function() {
        if (this.pageYOffset >= 150) {
          $('.edit-on-github').fadeIn(200);
        } else {
          $('.edit-on-github').fadeOut(200);
        }
      });
    }
  }]);