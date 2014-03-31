four51.app.directive('alertShow', ['$animate', function($animate) {
    return {
        scope: {
            'alertShow': '='
        },
        link: function(scope, element) {
            scope.$watch('alertShow', function(show) {
                if (show) {
                    $animate.removeClass(element, 'ng-hide');
                    $animate.addClass(element, 'ng-hide');
                }
            });
        }
    }
}]);