four51.app.directive('alertShow', ['$animate', function($animate) {
    return {
        scope: {
            'alertShow': '='
        },
        link: function(scope, element) {
            scope.$watch('alertShow', function(show) {
                if (show) {
                    $animate.enabled(true);
                    $animate.removeClass(element, 'ng-hide');
                    $animate.addClass(element, 'ng-hide');
                    $animate.enabled(false);
                }
            });
        }
    }
}]);