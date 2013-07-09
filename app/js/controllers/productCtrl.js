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

	$scope.calcTotal = function(qty){
		console.log('calc total called');
		var ps = $scope.priceSchedule;
		var unitPrice = 0;
		// AmountPerQuantity(fixed amount per unit)
		// AmountTotal (fixed amount per line)
		// Percentage (of line total)
		var fixedAddPerLine = 0;
		var percentagePerLine = 0;
		var amountPerQty = 0;
		var priceBreak;
		var otherValueMarkup = 0;

		angular.forEach($scope.product.Specs, function(spec){

			if(spec.AllowOtherValue && spec.OtherTextValue && spec.OtherValueMarkup > 0){
				otherValueMarkup += spec.OtherValueMarkup;
			}else if(spec.Options.length && spec.Value){
				var option = $451.filter(spec.Options, {Property: 'ID', Value: spec.Value})[0];
				//console.dir({markuptype: spec.MarkupType, note: 'markup option', option: option})
				if(spec.MarkupType ==="AmountPerQuantity" )
					amountPerQty += option.PriceMarkup;
				if(spec.MarkupType ==="Percentage" )
					percentagePerLine += option.PriceMarkup;
				if(spec.MarkupType ==="AmountTotal")
					fixedAddPerLine += option.PriceMarkup;
			}
		});

		angular.forEach(ps.PriceBreaks, function(pb){

			if(qty >= pb.Quantity)
				priceBreak = pb; //assumes they will be in order of smallest to largest
		});
		if(!priceBreak){
			console.log('no price break found');
			$scope.LineItem.LineTotal = 0;
			return;
		}
		var total = qty * (priceBreak.Price + amountPerQty);
		total += qty * priceBreak.Price * (percentagePerLine / 100);
		total += fixedAddPerLine + otherValueMarkup;

		$scope.DebugLineTotal = "quantity: " + qty +"<br>" +
			"amount added per quantity: " + amountPerQty + "<br>" +
			"fixed ammount per line added: " + fixedAddPerLine + "<br>" +
			"percentage added to qty*unitprice: " + percentagePerLine + "<br>" +
			"other value markups: " + otherValueMarkup + "<br>" +
			"unit price: " + priceBreak.Price;

		$scope.LineItem.LineTotal = total;
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

		$scope.calcTotal($scope.LineItem.Quantity);
	}
});

