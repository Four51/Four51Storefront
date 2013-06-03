four51.app.controller('ProductCtrl', function ($routeParams, $scope, ProductService, OrderService) {
    $scope.product = ProductService.get({interopID: $routeParams.productInteropID}, function(data){
        $scope.variant = data.Variants[0];
    }); //ProductService.getOne($routeParams.productInteropID)


    $scope.OrderService = OrderService;

    $scope.invalidQuantityAddToOrder = function(value, variant){
        if(!variant)
            return true;

        if(!variant.StandardPriceSchedule)
            return true;

        var valid = true;

        if(variant.StandardPriceSchedule.MinQuantity > value){
            valid = false;
            $scope.qtyErrorMessage = "must be greater than " + variant.StandardPriceSchedule.MinQuantity;
        }

        if(variant.StandardPriceSchedule.MaxQuantity < value){
            $scope.qtyErrorMessage = "must be less than " + variant.StandardPriceSchedule.MaxQuantity;
            valid = false;
        }

        if(variant.QuantityAvailable && variant.QuantityAvailable < value){
            $scope.qtyErrorMessage = "not enough available inventory " + variant.StandardPriceSchedule.MaxQuantity;
            valid = false;
        }
        if(valid)
            $scope.qtyErrorMessage = null;
        return valid;
    }
});