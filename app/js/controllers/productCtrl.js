four51.app.controller('ProductSearchCtrl', function($scope, Product, $routeParams, $location){

	if($routeParams.searchTerm){
		$scope.searchTerm = $routeParams.searchTerm;
		Product.search(null, $scope.searchTerm, function(products) {
			$scope.products = products;
		});
	}
	$scope.search = function(){
		$location.path('/search/' + $scope.searchTerm);
	}
})
four51.app.controller('LineItemEditCtrl', function ($routeParams, $scope, Product,ProductDisplayService, Order, $location) {
	$scope.LineItem = {};
	$scope.LineItem = $scope.currentOrder.LineItems[$routeParams.lineItemIndex];
	Product.get($scope.LineItem.Product.InteropID, function(product){
		$scope.LineItem.Product = product;
		ProductDisplayService.setProductViewScope($scope);
	});
	$scope.allowAddToOrder = true;
	$scope.addToOrderText = "Save Line Item";
	$scope.addToOrder = function(quantity, productInteropID, variantInteropID){
		Order.save($scope.currentOrder, function(o){
			$scope.currentOrder = o;
			$location.path('/cart');
		});
	}
});

four51.app.controller('shortProductViewCtrl', function ($routeParams, $sce, $scope, ProductDisplayService) {
	$scope.LineItem = {};
	$scope.LineItem.Product = $scope.p;
	ProductDisplayService.setNewLineItemScope($scope);
	ProductDisplayService.setProductViewScope($scope);
	$scope.allowAddToOrderInProductList = $scope.allowAddToOrder && $scope.LineItem.Specs.length == 0 && $scope.LineItem.Product.Type != 'VariableText';
	$scope.trustedProductDescription = function() {
		return $sce.trustAsHtml($scope.LineItem.Product.Description);
	};
});

four51.app.controller('ProductCtrl', function ($routeParams, $sce, $scope, Product, ProductDisplayService, Order, Variant, $451, $location, User) {
    $scope.selected = 1;
    $scope.LineItem = {};
	$scope.addToOrderText = "Add To Cart";
	$scope.loadingIndicator = true;

	$scope.trustedProductDescription = function() {
		return $sce.trustAsHtml($scope.LineItem.Product.Description);
	};
	$scope.trustedVariantDescription = function() {
		return $sce.trustAsHtml($scope.LineItem.Variant.Description);
	};

	$scope.getSpec = function() {
		if (!localStorage["angular-cache.caches.451Cache.data.productARIHome"]) return "null";
		return JSON.parse(localStorage["angular-cache.caches.451Cache.data.productARIHome"]).value.Specs.Size.Value;
	}
	$scope.calcVariantLineItems = function(i){
		$scope.variantLineItemsOrderTotal = 0;
		angular.forEach($scope.variantLineItems, function(item){
			$scope.variantLineItemsOrderTotal += item.LineTotal || 0;
		})
	};
	ProductDisplayService.getProductAndVariant($routeParams.productInteropID,$routeParams.variantInteropID, function(data){
		$scope.LineItem.Product = data.product;
		$scope.LineItem.Variant = data.variant;
		ProductDisplayService.setNewLineItemScope($scope);
		ProductDisplayService.setProductViewScope($scope);
		$scope.$broadcast('ProductGetComplete');
		$scope.loadingIndicator = false;
	});

	$scope.addToOrder = function(quantity, productInteropID, variantInteropID){
		$scope.addToOrderIndicator = true;
		if(!$scope.currentOrder){
			$scope.currentOrder = {};
			$scope.currentOrder.LineItems = [];
		}
		if($scope.allowAddFromVariantList){
			angular.forEach($scope.variantLineItems, function(item){
				if(item.Quantity > 0)
					$scope.currentOrder.LineItems.push(item);
			});
		}else{
			$scope.currentOrder.LineItems.push($scope.LineItem);
		}

		Order.save($scope.currentOrder, function(o){
			$scope.user.CurrentOrderID = o.ID;
			User.save($scope.user, function(){
				$scope.addToOrderIndicator = true;
				$location.path('/cart');
			});
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

	$scope.addMatrixToOrder = function(){ };

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


