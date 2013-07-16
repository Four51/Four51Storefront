four51.app.directive('lineitemgrid', function() {
    var obj = {
        scope: {
            order: '=',
            user: '='
        },
        restrict: 'E',
        templateUrl: 'partials/controls/lineItemGridView.html',
        transclude: true,
        controller: 'LineItemGridCtrl'
    }
    return obj;
});

