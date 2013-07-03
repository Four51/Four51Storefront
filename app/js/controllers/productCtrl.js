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
		// AmountPerQuantity(fixed amount per quantity)
		// AmountTotal (fixed amount per line)
		// Percentage (of line total)
		var fixedAddPerLine = 0;
		var percentagePerLine = [];
		var totalAddForPercentMarkup = 0;
		var amountPerQty = 0;
		var priceBreak;
		angular.forEach($scope.product.Specs, function(spec){
			if(spec.Options.length && spec.Value){
				if(spec.MarkupType ==="AmountPerQuantity" )
					amountPerQty += spec.Value.PriceMarkup;
				if(spec.MarkupType ==="Percentage" )
					percentagePerLine.push(spec.Value.PriceMarkup)
				if(spec.MarkupType ==="AmountTotal")
					fixedAddPerLine += spec.Value.PriceMarkup;
			}
		});

		angular.forEach(ps.PriceBreaks, function(pb){

			if(qty >= pb.Quantity)
				priceBreak = pb; //assumes they will be in order of smallest to largest
		});
		if(!priceBreak){
			console.log('no price break found');
			return;
		}
		angular.forEach(percentagePerLine, function(perctage){
			totalAddForPercentMarkup += priceBreak.Price * (perctage/100)
		});
		$scope.DebugLineTotal = "quantity: " + qty +"<br>" +
			"amount added per quantity: " + amountPerQty + "<br>" +
			"fixed ammount per line added: " + fixedAddPerLine + "<br>" +
			"add for percentage markup: " + totalAddForPercentMarkup + "<br>" +
			"unit price: " + priceBreak.Price
		$scope.LineItem.LineTotal = ((qty + amountPerQty) * priceBreak.Price) + fixedAddPerLine + totalAddForPercentMarkup;
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
			if(hasAllVarDefiningSpecs){
				var v = VariantService.search($scope.product.InteropID, specOptionIDs, function(data){
					console.log('variant complete');

					if(!data.IsDefaultVariant)
						modifyProductScope($scope.product, data)
				});
			}
		}

		$scope.calcTotal($scope.LineItem.Quantity);
	}
});