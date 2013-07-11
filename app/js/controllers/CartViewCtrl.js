
four51.app.controller('CartViewCtrl', function ($scope, $location, $451, OrderService, UserService) {
    $scope.cancelOrder = function() {
        OrderService.delete($scope.order, function() {
            $scope.order = null;
            UserService.refresh();
        });
    };

    $scope.saveChanges = function() {
        OrderService.save($scope.order);
    };

    $scope.user = UserService.get();
    $scope.order = $scope.user.CurrentOrderID != null ? OrderService.get({ id: $scope.user.CurrentOrderID }) : null;
});