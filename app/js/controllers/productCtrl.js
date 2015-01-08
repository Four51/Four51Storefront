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

four51.app.controller('ProductCtrl', ['$scope', '$routeParams', '$route', '$location', '$451', 'Product', 'ProductDisplayService', 'Order', 'Variant', 'User',
function ($scope, $routeParams, $route, $location, $451, Product, ProductDisplayService, Order, Variant, User) {
    $scope.selected = 1;
    $scope.LineItem = {};
	$scope.addToOrderText = "Add To Cart";
	$scope.loadingIndicator = true;
	$scope.loadingImage = true;
	$scope.searchTerm = null;
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
	function setDefaultQty(lineitem) {
		if (lineitem.PriceSchedule && lineitem.PriceSchedule.DefaultQuantity != 0)
			$scope.LineItem.Quantity = lineitem.PriceSchedule.DefaultQuantity;
	}
	function init(searchTerm, callback) {
		ProductDisplayService.getProductAndVariant($routeParams.productInteropID, $routeParams.variantInteropID, function (data) {
			$scope.LineItem.Product = data.product;
			$scope.LineItem.Variant = data.variant;
			ProductDisplayService.setNewLineItemScope($scope);
			ProductDisplayService.setProductViewScope($scope);
			setDefaultQty($scope.LineItem);
			$scope.$broadcast('ProductGetComplete');
			$scope.loadingIndicator = false;
			$scope.setAddToOrderErrors();
			if (angular.isFunction(callback))
				callback();
		}, $scope.settings.currentPage, $scope.settings.pageSize, searchTerm);
	}
	$scope.$watch('settings.currentPage', function(n, o) {
		if (n != o || (n == 1 && o == 1))
			init($scope.searchTerm);
	});

	$scope.searchVariants = function(searchTerm) {
		$scope.searchTerm = searchTerm;
		$scope.settings.currentPage == 1 ?
			init(searchTerm) :
			$scope.settings.currentPage = 1;
	};

	$scope.deleteVariant = function(v, redirect) {
		if (!v.IsMpowerVariant) return;
		// doing this because at times the variant is a large amount of data and not necessary to send all that.
		var d = {
			"ProductInteropID": $scope.LineItem.Product.InteropID,
			"InteropID": v.InteropID
		};
		Variant.delete(d,
			function() {
				redirect ? $location.path('/product/' + $scope.LineItem.Product.InteropID) : $route.reload();
			},
			function(ex) {
				$scope.lineItemErrors.push(ex.Message);
				$scope.showAddToCartErrors = true;
			}
		);
	}

	$scope.addToOrder = function(){
		if($scope.lineItemErrors && $scope.lineItemErrors.length){
			$scope.showAddToCartErrors = true;
			return;
		}
		if(!$scope.currentOrder){
			$scope.currentOrder = { };
			$scope.currentOrder.LineItems = [];
		}
		if (!$scope.currentOrder.LineItems)
			$scope.currentOrder.LineItems = [];
		if($scope.allowAddFromVariantList){
			angular.forEach($scope.variantLineItems, function(item){
				if(item.Quantity > 0){
					$scope.currentOrder.LineItems.push(item);
					$scope.currentOrder.Type = item.PriceSchedule.OrderType;
				}
			});
		}else{
			$scope.currentOrder.LineItems.push($scope.LineItem);
			$scope.currentOrder.Type = $scope.LineItem.PriceSchedule.OrderType;
		}
		$scope.addToOrderIndicator = true;
		//$scope.currentOrder.Type = (!$scope.LineItem.Product.IsVariantLevelInventory && $scope.variantLineItems) ? $scope.variantLineItems[$scope.LineItem.Product.Variants[0].InteropID].PriceSchedule.OrderType : $scope.LineItem.PriceSchedule.OrderType;
		// shipper rates are not recalcuated when a line item is added. clearing out the shipper to force new selection, like 1.0
		Order.clearshipping($scope.currentOrder).
			save($scope.currentOrder,
				function(o){
					$scope.user.CurrentOrderID = o.ID;
					User.save($scope.user, function(){
						$scope.addToOrderIndicator = true;
						$location.path('/cart');
					});
				},
				function(ex) {
					$scope.addToOrderIndicator = false;
					$scope.lineItemErrors.push(ex.Detail);
					$scope.showAddToCartErrors = true;
					//$route.reload();
				}
		);
	};

	$scope.setOrderType = function(type) {
		$scope.loadingIndicator = true;
		$scope.currentOrder = { 'Type': type };
		init(null, function() {
			$scope.loadingIndicator = false;
		});
	};

	$scope.$on('event:imageLoaded', function(event, result) {
		$scope.loadingImage = false;
		$scope.$apply();
	});
}]);
