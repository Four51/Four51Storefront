four51.app.controller('CheckOutViewCtrl', function ($scope, $451, UserService, OrderService) {
    $scope.user = UserService.get();
    $scope.order = $scope.user.CurrentOrderID != null ? OrderService.get({ id: $scope.user.CurrentOrderID }) : null;
});