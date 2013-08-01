four51.app.controller('CheckOutViewCtrl', function ($scope, $rootScope, $451, UserService, OrderService, AddressService, OrderConfigService) {
    $scope.user = UserService.get();
    $scope.order = $scope.user.CurrentOrderID != null ? OrderService.get({ id: $scope.user.CurrentOrderID },
        function(o) {
            // I'm deciding to handle the auto assignment of certain properties here. It's essentially the load of the cart view page
            // it's the first time we'd display information about the order where these auto assigned values
            OrderConfigService.costcenter(o,$scope.user);
        }) : null;

    $scope.continueShopping = function() {
        $location.path('catalog');
    };

    $scope.cancelOrder = function() {
        $scope.order = OrderService.delete($scope.order, function() {
            UserService.refresh();
        });
    };

    $scope.saveChanges = function() {
        OrderService.save($scope.order);
    };

    $scope.$watch('order.ShipAddressID', function(n,o) {
        if (!n || n == o) return;
        OrderService.save($scope.order, function() {
            $rootScope.$broadcast('event:shipAddressUpdate');
        });
    });
});