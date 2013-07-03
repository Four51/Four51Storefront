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

	$scope.calcTotal = function(qty){
		console.log('calc total called');
		var ps = $scope.priceSchedule;
		var unitPrice = 0;
		// markuptypes
		// NoMarkup
		// AmountPerQuantity(fixed amount per quantity)
		// AmountTotal (fixed amount per line)
		// Percentage (of line total)
		var fixedAddPerLine = 0;
		var percentagePerLine = [];
		var amountPerQty = 0;
		angular.forEach($scope.product.Specs, function(spec){
			if(spec.Options.length && spec.Value){
				if(spec.MarkupType ==="AmountPerQuantity" )
					amountPerQty += spec.Value.PriceMarkup;
				//if(spec.MarkupType ==="AmountTotal" )

				//if(spec.MarkupType ==="Percentage" )
			}

		});
		console.log("amt per qty: " + amountPerQty);
		angular.forEach(ps.PriceBreaks, function(pb){
			if(qty >= pb.Quantity)
				$scope.LineItem.UnitPrice = pb.Price;
		});
		$scope.LineItem.LineTotal = qty * $scope.LineItem.UnitPrice;
	}

	$scope.product = ProductService.get({interopID: $routeParams.productInteropID}, function(data){
        var v = null;
        if($routeParams.variantInteropID)
            v = $451.filter(data.Variants, {Property: 'InteropID', Value: $routeParams.variantInteropID})[0];

        modifyProductScope(data, v , $scope)
    });

	$scope.OrderService = OrderService;

	$scope.specChanged = function(spec){
		//$451.filter($scope.product.Specs, {Property: 'DefinesVariant', Value:true})
		if(spec.DefinesVariant)
		{
			var specOptionIDs = [];
			var hasAllVarDefiningSpecs = true;
			$451.filter($scope.product.Specs, {Property: 'DefinesVariant', Value:true}, function(item){
				if(!item.Value)
				{
					hasAllVarDefiningSpecs = false;
					return;
				}
				specOptionIDs.push(item.Value.ID);
			})
			if(!hasAllVarDefiningSpecs)
				return;

			var v = VariantService.search($scope.product.InteropID, specOptionIDs, function(data){
				console.log('variant complete');

				if(!data.IsDefaultVariant)
					modifyProductScope($scope.product, data)
			});
		}
		$scope.calcTotal($scope.LineItem.Quantity);

	}
});