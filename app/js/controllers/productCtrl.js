four51.app.controller('ProductCtrl', function ($routeParams, $scope, ProductService, OrderService) {
    $scope.product = ProductService.getOne($routeParams.productInteropID)
    $scope.OrderService = OrderService;

    $scope.invalidQuantityAddToOrder = function(value, product){
        if(!product.StandardPriceSchedule)
            return true;
        var valid = true;
        if(product.StandardPriceSchedule.MinQuantity > value){
            valid = false;
            $scope.qtyErrorMessage = "must be greater than " + product.StandardPriceSchedule.MinQuantity;
        }

        if(product.StandardPriceSchedule.MaxQuantity < value){
            $scope.qtyErrorMessage = "must be less than " + product.StandardPriceSchedule.MaxQuantity;
            valid = false;
        }

        if(product.Inventory && product.Inventory < value){
            $scope.qtyErrorMessage = "not enough available inventory " + product.StandardPriceSchedule.MaxQuantity;
            valid = false;
        }
        if(valid)
            $scope.qtyErrorMessage = null;
        return valid;
    }
});