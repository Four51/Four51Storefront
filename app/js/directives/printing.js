four51.app.directive('cartprint', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/cartPrintView.html'
    }
    return obj;
});

four51.app.directive('orderprint', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/orderPrintView.html'
    }
    return obj;
});