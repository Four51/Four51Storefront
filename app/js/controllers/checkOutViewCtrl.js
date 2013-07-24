four51.app.controller('CheckOutViewCtrl', function ($scope, $451, UserService, OrderService, AddressService) {
    $scope.user = UserService.get();
    $scope.order = $scope.user.CurrentOrderID != null ? OrderService.get({ id: $scope.user.CurrentOrderID }) : null;

    $scope.continueShopping = function() {
        $location.path('catalog');
    };

    $scope.cancelOrder = function() {
        OrderService.delete($scope.order, function() {
            $scope.order = null;
            UserService.refresh();
        });
    };

    $scope.saveChanges = function() {
        OrderService.save($scope.order, function(data) {
            $scope.order = data;
        });
    };

    $scope.$watch('order.ShipAddressID', function(n,o) {
      if (!n) return;
      $scope.order.ShipAddress = AddressService.get({ id: n });
    });
});