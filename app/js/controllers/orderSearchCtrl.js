'use strict';

four51.app.controller('OrderSearchCtrl', function OrderSearchCtrl($scope, OrderStatsService, OrderSearchService) {
    $scope.OrderStats = OrderStatsService.query();
	$scope.OrderSearch = function($event, stat) {
		$event.preventDefault();
		$scope.orders = OrderSearchService.search(stat);
		$scope.displayOrders = true;
		$scope.orderSearchStat = stat;
	};
});

