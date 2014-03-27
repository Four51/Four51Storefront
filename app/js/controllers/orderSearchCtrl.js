four51.app.controller('OrderSearchCtrl', ['$scope', '$location', 'OrderSearchCriteria', 'OrderSearch',
function ($scope,  $location, OrderSearchCriteria, OrderSearch) {
    OrderSearchCriteria.query(function(data) {
        $scope.OrderSearchCriteria = data;
        $scope.hasStandardTypes = _hasType(data, 'Standard');
        $scope.hasReplenishmentTypes = _hasType(data, 'Replenishment');
        $scope.hasPriceRequestTypes = _hasType(data, 'PriceRequest');
    });

    function _hasType(data, type) {
        var hasType = false;
        angular.forEach(data, function(o) {
            if (hasType || o.Type == type && o.Count > 0)
                hasType = true;
        });
        return hasType;
    }
	$scope.OrderSearch = function($event, criteria) {
		$event.preventDefault();
		$scope.showNoResults = false;
		OrderSearch.search(criteria, function(list) {
            $scope.orders = list;
			$scope.showNoResults = list.length == 0;
        });
		$scope.orderSearchStat = criteria;
	};
}]);