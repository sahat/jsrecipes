angular.module('MyApp')
  .directive('scroll', function($window) {
    return function(scope, element, attrs) {
      angular.element($window).bind('scroll', function() {
        if (this.pageYOffset >= 150) {
          $('.go-top').fadeIn(200);
        } else {
          $('.go-top').fadeOut(200);
        }
      });
    }
  });