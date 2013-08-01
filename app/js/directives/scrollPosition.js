four51.app.directive('scrollposition', function($window) {
    return function(scope, element, attrs) {
        var windowEl = angular.element($window);
        windowEl.on('scroll', function() {
            scope.$apply(function() {
                scope[attrs.scrollPosition] = windowEl.scrollTop();
            });
        });
    };
});

app.controller('ScrollController', function($scope) {
    $scope.scroll = 0;
});