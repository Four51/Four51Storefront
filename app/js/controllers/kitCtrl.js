four51.app.controller('KitCtrl', ['$scope', '$location', '$routeParams', 'Kit', 'ProductDisplayService', 'Order', 'User', function($scope, $location, $routeParams, Kit, ProductDisplayService, Order, User) {

	$scope.addToOrderText = 'Continue';
	$scope.settings = {
		currentPage: 1,
		pageSize: 10
	};

	// initial load. start from the kit parent
	Kit.get($routeParams.id, function(kit) {
		$scope.LineItem = {};
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
					$scope.LineItem = $scope.currentOrder.LineItems[order.LineItems.length-1].NextKitLineItem;
					SetupForOrder($scope.LineItem.Product);
					hasNext = true;
				}
				else {
					var current = $scope.currentOrder.LineItems[0];
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
			$scope.LineItem.Product = data.product;
			$scope.LineItem.Variant = data.variant; // should never be a variant
			ProductDisplayService.setNewLineItemScope($scope);
			ProductDisplayService.setProductViewScope($scope);
			$scope.setAddToOrderErrors();
		});
	}
}]);
