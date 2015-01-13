four51.app.controller('KitCtrl', ['$scope', '$location', '$routeParams', 'Kit', 'ProductDisplayService', 'Order', 'User', function($scope, $location, $routeParams, Kit, ProductDisplayService, Order, User) {

	$scope.addToOrderText = 'Continue';
	$scope.settings = {
		currentPage: 1,
		pageSize: 10
	};

	$scope.calcVariantLineItems = function(i){
		$scope.variantLineItemsOrderTotal = 0;
		angular.forEach($scope.variantLineItems, function(item){
			$scope.variantLineItemsOrderTotal += item.LineTotal || 0;
		})
	};

	// initial load. start from the kit parent
	Kit.get($routeParams.id, function(kit) {
		$scope.LineItem = $routeParams.lineitemid ? $scope.currentOrder.LineItems[$routeParams.lineitemid] : {};
		$scope.LineItem.IsKitParent = true;
		$scope.kit = kit;
		$scope.KitParent = kit.KitParent;
		$scope.KitItems = kit.KitItems;
		SetupForOrder($scope.kit.KitParent);
	});

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
		if ($scope.LineItem.Product.InteropID == $scope.kit.KitParent.InteropID)
			$scope.currentOrder.LineItems.push($scope.LineItem);
		// else ; handle all the kit children by updating lineitem

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
					SetupForOrder($scope.LineItem.Product);
					hasNext = true;
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
							SetupForOrder($scope.LineItem.Product);
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

	function SetupForOrder(product) {
		ProductDisplayService.getProductAndVariant(product.InteropID, null, function(data) {
			delete $scope.variantLineItems; // have to delete this because the scope is held in the service singleton and inherits any previous variants
			$scope.LineItem.Product = data.product;
			$scope.LineItem.Variant = data.variant; // should never be a variant
			ProductDisplayService.setNewLineItemScope($scope);
			ProductDisplayService.setProductViewScope($scope);
			$scope.setAddToOrderErrors();
		});
	}
}]);
