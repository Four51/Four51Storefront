four51.app.directive("scroll", ['$window', function ($window) {
    return function(scope, element) {
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 1) {
                scope.boolChangeClass = true;
                element.removeClass('static');
            } else {
                scope.boolChangeClass = false;
                element.addClass('static');
            }
            scope.$apply();
        });
    };
}]);