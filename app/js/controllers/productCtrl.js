four51.app.controller('LineItemEditCtrl', function ($routeParams, $scope, Product,ProductDisplayService, Order) {
	$scope.LineItem = {};

	Order.get(user.CurrentOrderID, function(data){
		$scope.LineItem = data.LineItems[$routeParams.lineItemIndex];
		Product.get($scope.LineItem.Product.InteropID, function(product){
            $scope.LineItem.Product = product;
            ProductDisplayService.setProductViewScope($scope);
		});
		$scope.allowAddToOrder = true;
	});
});

four51.app.controller('shortProductViewCtrl', function ($routeParams, $scope, ProductDisplayService) {
	$scope.LineItem = {};
	$scope.LineItem.Product = $scope.p;
	ProductDisplayService.setNewLineItemScope($scope);
	ProductDisplayService.setProductViewScope($scope);
	$scope.allowAddToOrderInProductList = $scope.allowAddToOrder && $scope.LineItem.Specs.length == 0 && $scope.LineItem.Product.Type != 'VariableText';
});

four51.app.controller('ProductCtrl', function ($routeParams, $scope, Product, ProductDisplayService, Order, Variant, $451, Order, $location) {
	$scope.LineItem = {};
	Product.get($routeParams.productInteropID, function(data){
        $scope.LineItem.Product = data;
        if($routeParams.variantInteropID){
			//Product.Variants doesn't return all details on variable text products, so go back for the rest.
            data.Type == 'VariableText' ?
                Variant.get({VariantInteropID: $routeParams.variantInteropID, ProductInteropID: data.InteropID }, function(variant) {
                    $scope.LineItem.Variant = variant;
                }) :
				$scope.LineItem.Variant = $451.filter(data.Variants, {Property: 'InteropID', Value: $routeParams.variantInteropID})[0];
		}
		ProductDisplayService.setNewLineItemScope($scope);
		ProductDisplayService.setProductViewScope($scope);
		$scope.$broadcast('ProductGetComplete');
	});

	$scope.addToOrder = function(quantity, productInteropID, variantInteropID){
		console.log('adding new lineitem');
		console.log($scope.LineItem);
		$scope.currentOrder.LineItems.push($scope.LineItem);
		console.log($scope.currentOrder);
		Order.save($scope.currentOrder, function(){
			console.log('add to order complete');
			$location.path('/cart');
		});
	}
});

four51.app.controller('CustomProductCtrlMatrix', function($scope, $451, Variant, ProductDisplayService){
	//just a little experiment on extending the product view
	$scope.matrixLineTotal = 0;
	$scope.LineItems = {};
	$scope.LineKeys = [];
	$scope.lineChanged = function(){
		var addToOrderTotal = 0;
		angular.forEach($scope.LineKeys, function(key){
			if($scope.LineItems[key].Variant){
				ProductDisplayService.calculateLineTotal($scope.LineItems[key]);
				addToOrderTotal += $scope.LineItems[key].LineTotal;
			}
		$scope.matrixLineTotal = addToOrderTotal;

		});
	};
	$scope.addMatrixToOrder = function(){
	};
	$scope.setFocusVariant = function(opt1, opt2){

		if($scope.LineItems[opt1.Value.toString() + opt2.Value.toString()].Variant){
			$scope.LineItem.Variant = $scope.LineItems[opt1.Value.toString() + opt2.Value.toString()].Variant;
			return;
		}

		Variant.get({'ProductInteropID': $scope.LineItem.Product.InteropID, 'SpecOptionIDs': [opt1.ID, opt2.ID]}, function(data){
			$scope.LineItem.Variant = data;
		});
	};
	$scope.$watch("LineItems", function(){
		$scope.lineChanged();
	}, true);

	$scope.$on('ProductGetComplete', function(){
		var specs = $451.filter($scope.LineItem.Product.Specs, {Property: 'DefinesVariant', Value: true});
		$scope.matrixSpec1 = specs[0];
		$scope.matrixSpec2 = specs[1];
		angular.forEach(specs[0].Options, function(option1){
			angular.forEach(specs[1].Options, function(option2){
				$scope.LineKeys.push(option1.Value.toString() + option2.Value.toString());
				$scope.LineItems[option1.Value.toString() + option2.Value.toString()] = {
					Product: $scope.LineItem.Product,
					PriceSchedule: $scope.LineItem.PriceSchedule,
				};
			});
		});
	});
});
