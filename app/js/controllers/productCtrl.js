four51.app.controller('ProductCtrl', function ($routeParams, $scope, ProductService, OrderService, VariantService, $451) {
	$scope.LineItem = {};
	function modifyProductScope(product, variant){

		if(variant){
			$scope.variant = variant;
			$scope.priceSchedule = variant.StandardPriceSchedule ? variant.StandardPriceSchedule : product.StandardPriceSchedule; //include user permissions to decide to show
			$scope.StaticSpecGroups = variant.StaticSpecGroups || product.StaticSpecGroups;
		}else{
			$scope.priceSchedule = variantHasPriceSchedule(product, 'StandardPriceSchedule') ? null : product.StandardPriceSchedule; //don't show price schedule if variant overrides parent PS
			$scope.StaticSpecGroups = product.StaticSpecGroups;
		}
		$scope.showInventory = (product.QuantityAvailable || ($scope.variant && $scope.variant.QuantityAvailable)) && product.DisplayInventory == true; //add some logic around user permissions

		$scope.lineItemSpecs = [];
		angular.forEach(product.Specs, function(item){
			if(item.CanSetForLineItem || item.DefinesVariant)
				$scope.lineItemSpecs.push(item);
		});
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

	$scope.addToOrder = function(quantity, productInteropID, variantInteropID){
		OrderService.addToOrder(quantity, productInteropID, variantInteropID);
	}

	$scope.specChanged = function(spec){
		console.log('spec changed called...');
		console.dir(spec)
		if(!spec){
			console.log('spec changed called, but no spec passed');
			return;
		}

		if(spec.DefinesVariant)
		{
			var specOptionIDs = [];
			var hasAllVarDefiningSpecs = true;
			$451.filter($scope.product.Specs, {Property: 'DefinesVariant', Value:true}, function(item){
				console.log('item.value: ' + item.Value);
				if(!item.Value)
				{
					hasAllVarDefiningSpecs = false;
					return;
				}
				specOptionIDs.push(item.Value);
			})
			if(hasAllVarDefiningSpecs){
				var v = VariantService.search($scope.product.InteropID, specOptionIDs, function(data){
					console.log('variant complete');

					if(!data.IsDefaultVariant)
						modifyProductScope($scope.product, data)
				});
			}
		}
//var ps = $scope.priceSchedule;
		//$scope.variant
		//$scope.product
		//$scope.LineItem
		//$scope.DebugLineTotal
		$451.calculateLineTotal($scope.priceSchedule, $scope.variant, $scope.product, $scope.LineItem, $scope.DebugLineTotal)
	}
});

