four51.app.controller('ProductCtrl', function ($routeParams, $scope, ProductService, OrderService, $451) {

    $scope.product = ProductService.get({interopID: $routeParams.productInteropID}, function(data){
        if($routeParams.variantInteropID){
            var v = $451.filter(data.Variants, {Property: 'InteropID', Value: $routeParams.variantInteropID})[0];
            $scope.variant = v;
            $scope.priceSchedule = v.StandardPriceSchedule ? v.StandardPriceSchedule : data.StandardPriceSchedule;
        }else{
            $scope.priceSchedule = data.StandardPriceSchedule;
        }
    });

    $scope.OrderService = OrderService;

    $scope.invalidQuantityAddToOrder = function(value, variant, priceSchedule){
        if(!variant)
            return true;

        if(!priceSchedule)
            return true;

        var valid = true;

        if(priceSchedule.MinQuantity > value){
            valid = false;
            $scope.qtyErrorMessage = "must be greater than " + priceSchedule.MinQuantity;
        }

        if(priceSchedule.MaxQuantity < value){
            $scope.qtyErrorMessage = "must be less than " + priceSchedule.MaxQuantity;
            valid = false;
        }

        if(variant.QuantityAvailable && variant.QuantityAvailable < value){
            $scope.qtyErrorMessage = "not enough available inventory " + priceSchedule.MaxQuantity;
            valid = false;
        }
        if(valid)
            $scope.qtyErrorMessage = null;
        return valid;
    }
});