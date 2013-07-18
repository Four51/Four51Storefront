four51.app.controller('LineItemEditCtrl', function ($routeParams, $scope, ProductService, OrderService, VariantService, $451, UserService) {
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
			$scope.LineItem.Variant = $451.filter(data.Variants, {Property: 'InteropID', Value: $routeParams.variantInteropID})[0];
		}
		ProductService.setNewLineItemScope($scope);
		ProductService.setProductViewScope($scope);
	});

	$scope.addToOrder = function(quantity, productInteropID, variantInteropID){
		OrderService.addToOrder(quantity, productInteropID, variantInteropID);
	}


});

