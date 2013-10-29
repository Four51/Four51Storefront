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


//http://stackoverflow.com/questions/12790854/angular-directive-to-scroll-to-a-given-item
//focus on products by scrolling past bootstrap .jumbotron branding section while still allowing user ability to scroll back
//TODO works intermittently, tried several variations os animating the html, body but does not always work grr
four51.app.directive('scrollIf', function () {
    return function () {

        setTimeout(function () {
            $('html').animate({
                scrollTop: 150
            }, 800);
            return false;
        }, 1000);
    }
});