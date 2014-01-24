// custom ng-show for alerts to auto hide itself after show with CSS and using a modified version of http://stackoverflow.com/questions/20921622/running-code-after-an-angularjs-animation-has-completed
four51.app.directive('alertShow', function($animate) {
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
})
