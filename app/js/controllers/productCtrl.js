four51.app.controller('ProductCtrl', function ($routeParams, $scope, ProductService, OrderService, $451) {
    $scope.product = ProductService.get({interopID: $routeParams.productInteropID}, function(data){
        var v = null;
        if($routeParams.variantInteropID)
            v = $451.filter(data.Variants, {Property: 'InteropID', Value: $routeParams.variantInteropID})[0];

        ProductService.modifyProductScope(data, v , $scope)
    });
    $scope.OrderService = OrderService;
});