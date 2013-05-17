'use strict';

four51.app.controller('OrderSearchCtrl', function OrderSearchCtrl($scope, OrderSearchCriteriaService, OrderSearchService) {
    $scope.OrderSearchCriteria = OrderSearchCriteriaService.query();
	$scope.OrderSearch = function($event, criteria) {
		$event.preventDefault();
		$scope.orders = OrderSearchService.search(criteria);
		$scope.displayOrders = true;
		$scope.orderSearchStat = criteria;
	};
});

