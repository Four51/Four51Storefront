
four51.app.controller('CartViewCtrl', function ($scope, $location, $451, OrderService, UserService) {
    $scope.order = OrderService.get({ id: UserService.current.CurrentOrderID });
    $scope.checkout = function() {
        console.log('checkout');
    };
    $scope.cancelOrder = function() {
        console.log('cancel');
    };
});