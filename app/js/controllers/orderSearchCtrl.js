'use strict';

four51.app.controller('OrderSearchCtrl', function OrderSearchCtrl($scope, OrderSearchCriteria, OrderSearch) {
    OrderSearchCriteria.query(function(data) {
        $scope.OrderSearchCriteria = data;
    });
	$scope.OrderSearch = function($event, criteria) {
		$event.preventDefault();
		OrderSearch.search(criteria, function(list) {
            $scope.orders = list;
        });
		$scope.displayOrders = true;
		$scope.orderSearchStat = criteria;
	};
    $scope.showMega = true;
});

