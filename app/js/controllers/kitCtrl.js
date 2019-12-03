four51.app.controller('KitCtrl', ['$scope', '$location', '$routeParams', 'Kit', 'ProductDisplayService', 'Order', 'User', function($scope, $location, $routeParams, Kit, ProductDisplayService, Order, User) {
	$scope.addToOrderText = 'Add Kit to Cart';
	$scope.updateKitLineItemText = 'Update';

	$scope.settings = {
		currentPage: 1,
		pageSize: 10
	};

	// initial load. start from the kit parent
	Kit.get($routeParams.id).then(kitSuccess);

	function kitSuccess(kit) {
		$scope.LineItem = $routeParams.lineitemid ? $scope.currentOrder.LineItems[$routeParams.lineitemid] : {};
		if($routeParams.lineitemid){
			$scope.kitIndex = $routeParams.lineitemid;
		}
		$scope.LineItem.IsKitParent = true;
		$scope.Kit = kit;
		setupProduct(kit.KitParent, null, null, function(){
			if ($scope.LineItem.ID) {
				$scope.addToOrderText = 'Update Kit';
				Kit.mapKitToOrder($scope.Kit, $scope.LineItem);
				var newVariant = store.get("kitItem");
				if(newVariant){
					angular.forEach($scope.Kit.KitItems, function(item){
						if(item.LineItem && item.LineItem.Product && item.LineItem.Product.InteropID === newVariant){
							setCurrent(item);
							store.remove("kitItem");
						}
					});
				}
			}
		});
	}

	$scope.saveOrder = saveOrder;
	$scope.saveKitItem = saveItem;
	$scope.setItemAsCurrent = setCurrent;
	$scope.calcVariantLineItems = calcVariantLineItems;
	$scope.selectVariant = selectVariant;
	$scope.searchVariants = searchVariants;
	$scope.$watch('settings.currentPage',changePage);

	function changePage(n,o) {
		if (!$scope.LineItem) return;
		if (n != o || (n == 1 && o == 1))
			setupProduct($scope.LineItem.Product, null, $scope.searchTerm);
	}

	function searchVariants(searchTerm) {
		$scope.searchTerm = searchTerm;
		$scope.settings.currentPage == 1 ?
			setupProduct($scope.LineItem.Product, null, searchTerm) :
			$scope.settings.currentPage = 1;
	}

	function selectVariant(variant) {
		angular.forEach($scope.LineItem.Product.Variants, function(v) {
			if (v.Selected) v.Selected = false;
		});
		variant.Selected = true;
		$scope.LineItem.Variant = variant;
	}

	function setCurrent(item) {
		if (!item.LineItem.IsConfigurable) return;
		$scope.LineItem = item.LineItem;
		$scope.LineItem.Quantity = item.Quantity;
		$scope.ActiveKitItem = item;
		setupProduct(item.LineItem.Product, item.LineItem.Variant);
	}

	function setupProduct(product, variant, searchTerm, success) {
		// have to empty this because the scope is held in the service singleton and inherits any previous variants
		$scope.variantLineItems = null;
		ProductDisplayService.getProductAndVariant(product.InteropID, variant ? variant.InteropID : null, function (data) {
			$scope.LineItem.Product = data.product;
			//$scope.LineItem.Variant = data.variant; // should never be a variant
			ProductDisplayService.setNewLineItemScope($scope);
			ProductDisplayService.setProductViewScope($scope);
			if ($scope.variantLineItems) {
				angular.forEach($scope.variantLineItems, function(li) {
					li.Quantity = $scope.LineItem.Quantity;
				});
			}
			$scope.setAddToOrderErrors();
			$scope.allowAddToOrder = true;
			if(success) success();
		}, $scope.settings.currentPage, $scope.settings.pageSize, searchTerm);
	}

	function calcVariantLineItems() {
		$scope.variantLineItemsOrderTotal = 0;
		angular.forEach($scope.variantLineItems, function(item){
			$scope.variantLineItemsOrderTotal += item.LineTotal || 0;
		});
	}

	function saveOrder() {
		$scope.addToOrderIndicator = true;
		$scope.showAddToCartErrors = false;

		if ($scope.lineItemErrors && $scope.lineItemErrors.length) {
			$scope.showAddToCartErrors = true;
			$scope.addToOrderIndicator = false;
			return;
		}

		$scope.currentOrder = $scope.currentOrder || {};
		$scope.currentOrder.LineItems = $scope.currentOrder.LineItems || [];
		if (!$scope.LineItem.ID)
			$scope.currentOrder.LineItems.push($scope.LineItem);

		$scope.currentOrder.Type = $scope.LineItem.PriceSchedule.OrderType;
		Kit.saveOrder($scope.currentOrder, success, fail);

		function success(order) {
			$scope.currentOrder = order;
			$scope.kitIndex = $routeParams.lineitemid ? $routeParams.lineitemid : $scope.currentOrder.LineItems.length - 1;
			var currentLineItem = order.LineItems[$scope.kitIndex];
			Kit.mapKitToOrder($scope.Kit, currentLineItem);
			$scope.user.CurrentOrderID = order.ID;
			User.save($scope.user, function () {
				$scope.addToOrderIndicator = false;
				if (!$scope.Kit.KitHasConfigurableItems){
					$location.path('/cart');
				}
				else{
					$location.path('/kit/' + $routeParams.id + "/" + $scope.kitIndex);
				}
			});
			setupProduct(currentLineItem.Product, currentLineItem.Variant);
		}

		function fail(ex) {
			$scope.addToOrderIndicator = false;
			$scope.lineItemErrors.push(ex.Detail);
			$scope.showAddToCartErrors = true;
		}
	}

	function saveItem() {
		$scope.addToOrderIndicator = true;
		$scope.showAddToCartErrors = false;

		Order.save($scope.currentOrder, success, error);

		function success(order) {
			$scope.kitIndex = $routeParams.lineitemid ? $routeParams.lineitemid : $scope.currentOrder.LineItems.length - 1;
			$scope.currentOrder = order;
			$scope.addToOrderIndicator = false;
			$scope.lineItemErrors = null;
			Kit.mapKitToOrder($scope.Kit,  order.LineItems[$scope.kitIndex]);
		}

		function error(ex) {
			$scope.addToOrderIndicator = false;
			$scope.lineItemErrors.push(ex.Detail);
			$scope.showAddToCartErrors = true;
		}
	}
}]);
