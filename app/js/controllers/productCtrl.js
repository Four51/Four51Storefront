four51.app.controller('ProductCtrl', function ($routeParams, $scope, ProductService, OrderService, $451) {
	function modifyProductScope(product, variant, scope){
		if(variant){
			scope.variant = variant;
			scope.priceSchedule = variant.StandardPriceSchedule ? variant.StandardPriceSchedule : product.StandardPriceSchedule; //include user permissions to decide to show
			scope.StaticSpecGroups = variant.StaticSpecGroups || product.StaticSpecGroups;
		}else{
			scope.priceSchedule = variantHasPriceSchedule(product, 'StandardPriceSchedule') ? null : product.StandardPriceSchedule; //don't show price schedule if variant overrides parent PS
			scope.StaticSpecGroups = product.StaticSpecGroups;
		}
		scope.showInventory = (product.QuantityAvailable || (scope.variant && scope.variant.QuantityAvailable)) && product.DisplayInventory == true; //add some logic around user permissions

		function variantHasPriceSchedule(product, scheduleType){
			if(!product.Variants)
				return false;
			for(var i = 0; i < product.Variants.length; i++){
				if(product.Variants[i][scheduleType])
					return true;
			}
			return false;
		}
	}
    $scope.product = ProductService.get({interopID: $routeParams.productInteropID}, function(data){
        var v = null;
        if($routeParams.variantInteropID)
            v = $451.filter(data.Variants, {Property: 'InteropID', Value: $routeParams.variantInteropID})[0];

        modifyProductScope(data, v , $scope)
    });
    $scope.OrderService = OrderService;

	$scope.specChanged = function(){

		console.log('specchanged');
		//$451.filter($scope.product.Specs, {Property: 'DefinesVariant', Value:true})
		var specOptionIDs = [];
		$451.filter($scope.product.Specs, {Property: 'DefinesVariant', Value:true}, function(item){
			specOptionIDs.push(item.Value);
		})
		$scope.dividingSpecValues = specOptionIDs.join();

	}
});