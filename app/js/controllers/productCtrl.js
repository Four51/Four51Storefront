$451.app.controller('ProductCtrl', function ($routeParams, $scope, ProductService) {
    $scope.product = ProductService.getOne($routeParams.productInteropID)
});