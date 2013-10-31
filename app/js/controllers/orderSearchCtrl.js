'use strict';

four51.app.controller('OrderSearchCtrl', function OrderSearchCtrl($scope, OrderSearchCriteria, OrderSearch) {
    OrderSearchCriteria.query(function(data) {
        $scope.OrderSearchCriteria = data;
        $scope.hasStandardTypes = _hasType(data, 'Standard');
        $scope.hasReplenishmentTypes = _hasType(data, 'Replenishment');
        $scope.hasPriceRequestTypes = _hasType(data, 'PriceRequest');
    });

    function _hasType(data, type) {
        var hasType = false;
        angular.forEach(data, function(o) {
            if (hasType || o.Type == type)
                hasType = true;
        });
        return hasType;
    }
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

