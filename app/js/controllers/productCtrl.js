four51.app.controller('LineItemEditCtrl', function ($routeParams, $scope, ProductService, OrderService, VariantService, $451, UserService) {
	//TODO:pull live product data. line item doesn't come back with enough.
	$scope.LineItem = {};
	var user = UserService.get();
	OrderService.get({ id: user.CurrentOrderID }, function(data){
		$scope.LineItem = data.LineItems[$routeParams.lineItemIndex];
		$scope.allowAddToOrder = true;
		ProductService.setProductViewScope($scope);

	});
});

four51.app.controller('shortProductViewCtrl', function ($routeParams, $scope, ProductService, OrderService, VariantService, $451) {
	$scope.LineItem = {};
	$scope.LineItem.Product = $scope.p;
	ProductService.setNewLineItemScope($scope);
	ProductService.setProductViewScope($scope);
	$scope.allowAddToOrderInProductList = $scope.allowAddToOrder && $scope.LineItem.Specs.length == 0 && $scope.LineItem.Product.Type != 'VariableText';
});

four51.app.controller('ProductCtrl', function ($routeParams, $scope, ProductService, OrderService, VariantService, $451) {
	$scope.LineItem = {};

	$scope.LineItem.Product = ProductService.get({interopID: $routeParams.productInteropID}, function(data){
        var v = null;
        if($routeParams.variantInteropID){
			//Product.Variants doesn't return all details on variable text products, so go back for the rest.
			$scope.LineItem.Variant = data.Type == 'VariableText' ? VariantService.get({VariantInteropID: $routeParams.variantInteropID, ProductInteropID: data.InteropID })
				: $451.filter(data.Variants, {Property: 'InteropID', Value: $routeParams.variantInteropID})[0];
		}
		ProductService.setNewLineItemScope($scope);
		ProductService.setProductViewScope($scope);
	});

	$scope.addToOrder = function(quantity, productInteropID, variantInteropID){
		OrderService.addToOrder(quantity, productInteropID, variantInteropID);
	}


});

