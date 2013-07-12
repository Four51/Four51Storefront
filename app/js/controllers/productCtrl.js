four51.app.controller('shortProductViewCtrl', function ($routeParams, $scope, ProductService, OrderService, VariantService, $451) {

	$scope.LineItem = {};
	$scope.LineItem.Product = $scope.p;
	ProductService.setProductScope($scope.LineItem.Product, null, $scope);
	$scope.allowAddToOrder = $scope.LineItem.Product.Variants.length == 0 && $scope.lineItemSpecs.length == 0 && $scope.LineItem.Product.Type != 'VariableText';

});
four51.app.controller('ProductCtrl', function ($routeParams, $scope, ProductService, OrderService, VariantService, $451) {
	$scope.LineItem = {};

	$scope.LineItem.Product = ProductService.get({interopID: $routeParams.productInteropID}, function(data){
        var v = null;
        if($routeParams.variantInteropID)
            v = $451.filter(data.Variants, {Property: 'InteropID', Value: $routeParams.variantInteropID})[0];

        ProductService.setProductScope(data, v, $scope)
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
			$451.filter($scope.LineItem.Product.Specs, {Property: 'DefinesVariant', Value:true}, function(item){
				if(!item.Value)
				{
					hasAllVarDefiningSpecs = false;
					return;
				}
				specOptionIDs.push(item.Value);
			})
			if(hasAllVarDefiningSpecs){
				var v = VariantService.search($scope.LineItem.Product.InteropID, specOptionIDs, function(data){
					if(!data.IsDefaultVariant)
						ProductService.setProductScope($scope.LineItem.Product, data, $scope)
				});
			}
		}
//var ps = $scope.priceSchedule;
		//$scope.variant
		//$scope.product
		//$scope.LineItem
		//$scope.DebugLineTotal
		ProductService.calculateLineTotal($scope.LineItem, $scope.DebugLineTotal)
	}
});

