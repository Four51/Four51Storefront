four51.app.controller('ProductCtrl', function ($routeParams, $scope, ProductService, OrderService, $451) {

    $scope.product = ProductService.get({interopID: $routeParams.productInteropID}, function(data){
        if($routeParams.variantInteropID){
            var v = $451.filter(data.Variants, {Property: 'InteropID', Value: $routeParams.variantInteropID})[0];
            $scope.variant = v;
            $scope.priceSchedule = v.StandardPriceSchedule ? v.StandardPriceSchedule : data.StandardPriceSchedule; //include user permissions to decide to show
            $scope.StaticSpecGroups = v.StaticSpecGroups || data.StaticSpecGroups;
        }else{
            $scope.priceSchedule = ProductService.HasVariantOverridePS(data, 'StandardPriceSchedule') ? null : data.StandardPriceSchedule; //don't show price schedule if variant overrides parent PS
            $scope.StaticSpecGroups = data.StaticSpecGroups;
        }

        $scope.showInventory = (data.QuantityAvailable || ($scope.variant && $scope.variant.QuantityAvailable)) && data.DisplayInventory == true; //add some logic around user permissions
    });
    $scope.OrderService = OrderService;

    $scope.validQuantityAddToOrder = function(value, variant, product, priceSchedule){

        if(!product && !variant)
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
        var qtyAvail = variant || product;

        if(qtyAvail.QuantityAvailable && qtyAvail.QuantityAvailable < value && product.AllowExceedInventory == false){
            $scope.qtyErrorMessage = "not enough available inventory " +  product.QuantityAvailable;
            valid = false;
        }
        if(valid)
            $scope.qtyErrorMessage = null;
        return valid;
    }
});