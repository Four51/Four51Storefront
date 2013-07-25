four51.app.controller('OrderViewCtrl', function OrderViewCtrl($scope, $routeParams, OrderService, FavoriteOrderService) {
	$scope.order = OrderService.get({ id: $routeParams.id }, function(data){
		$scope.hasSpecsOnAnyLineItem = false;
		for(var i = 0; i < data.LineItems.length ; i++) {
			if (data.LineItems[i].Specs) {
				$scope.hasSpecsOnAnyLineItem = true;
				break;
			}
		}
	});

	$scope.hasShipperOnAnyLineItem = function() {
		angular.forEach($scope.order.LineItems, function(item) {
			if (item.Shipper) return true;
		});
		return false;
	};
	$scope.hasShipAccountOnAnyLineItem = function() {
		angular.forEach($scope.order.LineItems, function(item) {
			if (item.ShipAccount) return true;
		});
		return false;
	};
	$scope.repeatOrder = function() {
		OrderService.repeat($scope.order);
	};

	$scope.saveFavorite = function() {
		FavoriteOrderService.save($scope.order)
	};
});

