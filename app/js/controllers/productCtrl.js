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

    $scope.invalidQuantityAddToOrder = function(value, product, priceSchedule){

        console.log("qty validator: " + value);

        if(!product)
            return true;

        if(!priceSchedule)
            return true;

        var valid = true;

        if(priceSchedule.MinQuantity > value){
            valid = false;
            $scope.qtyErrorMessage = "must be greater than " + priceSchedule.MinQuantity;
        }

        if(priceSchedule.MaxQuantity && priceSchedule.MaxQuantity < value){
            $scope.qtyErrorMessage = "must be less than " + priceSchedule.MaxQuantity;
            valid = false;
        }

        if(product.QuantityAvailable && product.QuantityAvailable < value){
            $scope.qtyErrorMessage = "not enough available inventory " +  product.QuantityAvailable;
            valid = false;
        }
        if(valid)
            $scope.qtyErrorMessage = null;
        return valid;
    }
});