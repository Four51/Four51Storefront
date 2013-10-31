//stackoverflow.com/questions/14878761/angularjs-bind-scroll-toggle-class
//body class="scroll || static" is global scroll check
four51.app.directive("scroll", function ($window) {
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
});