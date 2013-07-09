
four51.app.controller('CartViewCtrl', function ($scope, $location, $451, OrderService, UserService) {
    $scope.checkout = function() {
        console.log('checkout');
    };
    $scope.cancelOrder = function() {
        OrderService.delete($scope.order, function() {
            $location.path('#/catalog');
        });
    };
    $scope.loadCart = function() {
        var currentOrderID = UserService.get().CurrentOrderID;
        $scope.order = currentOrderID != null ? OrderService.get({ id: currentOrderID }) : null;
    }
});