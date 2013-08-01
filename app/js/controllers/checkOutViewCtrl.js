four51.app.controller('CheckOutViewCtrl', function ($scope, $rootScope, $451, UserService, OrderService, AddressService) {
    $scope.user = UserService.get();
    $scope.order = $scope.user.CurrentOrderID != null ? OrderService.get({ id: $scope.user.CurrentOrderID }) : null;

    $scope.continueShopping = function() {
        $location.path('catalog');
    };

    $scope.cancelOrder = function() {
        $scope.order = OrderService.delete($scope.order, function() {
            UserService.refresh();
        });
    };

    $scope.saveChanges = function() {
        $scope.order = OrderService.save($scope.order);
    };

    $scope.$watch('order.ShipAddressID', function(n,o) {
        if (!n || n == o) return;
        //$scope.order.ShipAddressID = n;
        OrderService.save($scope.order, function() {
            $rootScope.$broadcast('event:shipAddressUpdate');
        });
    });
});