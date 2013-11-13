four51.app.directive('cartprint', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/cartPrintView.html',
        controller: function($scope){

        }
    }
    return obj;
});

four51.app.directive('orderprint', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/orderPrintView.html',
        controller: function($scope){

        }
    }
    return obj;
});
