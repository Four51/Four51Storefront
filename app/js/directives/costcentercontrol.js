four51.app.directive('costcenter', function() {
    var obj = {
        scope: {
            user: '=',
            order: '=',
            lineitem: '='
        },
        restrict: 'E',
        templateUrl: 'partials/controls/costCenter.html'
    }
    return obj;
});