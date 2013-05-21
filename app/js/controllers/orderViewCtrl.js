four51.app.controller('OrderViewCtrl', function OrderViewCtrl($scope, $routeParams, OrderService) {
	$scope.order = OrderService.get({ id: $routeParams.id });
	$scope.hasSpecsOnAnyLineItem = function() {
		angular.forEach($scope.order.LineItems, function(item) {
			if (item.Specs) return true;
		});
		return false;
	}
	$scope.hasShipperOnAnyLineItem = function() {
		angular.forEach($scope.order.LineItems, function(item) {
			if (item.Shipper) return true;
		});
		return false;
	}
	$scope.hasShipAccountOnAnyLineItem = function() {
		angular.forEach($scope.order.LineItems, function(item) {
			if (item.ShipAccount) return true;
		});
		return false;
	}
});