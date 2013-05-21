'use strict';

four51.app.controller('LineItemViewCtrl', function ($scope, $routeParams, OrderService) {
    $scope.order = OrderService.get({ id: $routeParams.orderid });
	$scope.lineItemIndex = $routeParams.lineitemid;
	$scope.hasPriceSchedule = function() {
		return $scope.order.LineItems[$scope.lineItemIndex].PriceSchedule.PriceBreaks.length > 0;
	}
});
