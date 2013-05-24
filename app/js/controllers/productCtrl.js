four51.app.controller('ProductCtrl', function ($routeParams, $scope, ProductService, OrderService) {
    $scope.product = ProductService.getOne($routeParams.productInteropID)
    $scope.OrderService = OrderService;
});