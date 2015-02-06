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
		$scope.LineItem.IsKitParent = true;
		$scope.Kit = kit;
		setupProduct(kit.KitParent);
		if ($scope.LineItem.ID) {
			$scope.addToOrderText = 'Update Kit';
			Kit.mapKitToOrder($scope.Kit, $scope.LineItem);
		}
	}

	$scope.saveOrder = saveOrder;
	$scope.saveKitItem = saveItem;
	$scope.setItemAsCurrent = setCurrent;
	$scope.calcVariantLineItems = calcVariantLineItems;
	$scope.selectVariant = selectVariant;

	function selectVariant(variant) {
		angular.forEach($scope.LineItem.Product.Variants, function(v) {
			v.Selected = false;
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

	function setupProduct(product, variant) {
		// have to empty this because the scope is held in the service singleton and inherits any previous variants
		$scope.variantLineItems = {};
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
		});
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
			Kit.mapKitToOrder($scope.Kit, order.LineItems[$routeParams.lineitemid || $scope.currentOrder.LineItems.length - 1]);
			$scope.user.CurrentOrderID = order.ID;
			User.save($scope.user, function () {
				$scope.addToOrderIndicator = false;
			});
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
			$scope.currentOrder = order;
			$scope.addToOrderIndicator = false;
			$scope.lineItemErrors = null;
			Kit.mapKitToOrder($scope.Kit,  order.LineItems[$routeParams.lineitemid || $scope.currentOrder.LineItems.length - 1]);
		}

		function error(ex) {
			$scope.addToOrderIndicator = false;
			$scope.lineItemErrors.push(ex.Detail);
			$scope.showAddToCartErrors = true;
		}
	}
}]);

/*

	$scope.selectVariant = function(variant) {
		angular.forEach($scope.LineItem.Product.Variants, function(v) {
			v.Selected = false;
		});
		variant.Selected = true;
		$scope.LineItem.Variant = variant;
	};

	$scope.addToOrder = function() {
		$scope.currentOrder = $scope.currentOrder || {};
		$scope.currentOrder.LineItems = $scope.currentOrder.LineItems || [];
		if (!$scope.LineItem.ID)
			$scope.currentOrder.LineItems.push($scope.LineItem);

		$scope.currentOrder.Type = $scope.LineItem.PriceSchedule.OrderType;
		$scope.addToOrderIndicator = true;
		Order.clearshipping($scope.currentOrder).
			save($scope.currentOrder,
			function(order){
				// step 1, find the line item on the order we're configuring
				// for now assume 0

				var hasNext = false;
				$scope.currentOrder = order;
				if ($scope.LineItem.IsKitParent) {
					// getting the current line item after the parent works because it has to be the last one in the order line item list
					$scope.LineItem = $scope.currentOrder.LineItems[order.LineItems.length-1].NextKitLineItem;
					if ($scope.LineItem) {
						SetupForOrder($scope.LineItem.Product, $scope.LineItem.Variant);
						hasNext = true;
					}
				}
				else {
					var current = null; // = $scope.currentOrder.LineItems[0]; // edit this to get the right line item if more than 1 exists
					if ($scope.LineItem.IsKitChild) {
						angular.forEach(order.LineItems, function(li) {
							if (li.ID == $scope.LineItem.ParentKitLineItemID)
								current = li;
						});
					}

					while(!hasNext && current.NextKitLineItem) {
						if (current.NextKitLineItem && (current.ID == $scope.LineItem.ID)) {
							$scope.LineItem = current.NextKitLineItem;
							SetupForOrder($scope.LineItem.Product, $scope.LineItem.Variant);
							hasNext = true;
						}
						current = current.NextKitLineItem;
					}
				}

				$scope.user.CurrentOrderID = order.ID;
				User.save($scope.user, function() {
					$scope.addToOrderIndicator = false;
					if (!hasNext)
						$location.path('/cart');
				});
			},
			function(ex) {
				$scope.addToOrderIndicator = false;
				$scope.lineItemErrors.push(ex.Detail);
				$scope.showAddToCartErrors = true;
			}
		);
	};

}]);

*/