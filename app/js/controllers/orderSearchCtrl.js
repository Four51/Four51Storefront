four51.app.controller('OrderSearchCtrl', ['$scope', '$location', 'OrderSearchCriteria', 'OrderSearch',
function ($scope,  $location, OrderSearchCriteria, OrderSearch) {
	$scope.settings = {
		currentPage: 1,
		pageSize: 10
	};

	OrderSearchCriteria.query(function(data) {
		$scope.OrderSearchCriteria = data;
		$scope.hasStandardTypes = _hasType(data, 'Standard');
		$scope.hasReplenishmentTypes = _hasType(data, 'Replenishment');
		$scope.hasPriceRequestTypes = _hasType(data, 'PriceRequest');
	});

	$scope.$watch('settings.currentPage', function() {
		Query($scope.currentCriteria);
	});

	$scope.OrderSearch = function($event, criteria) {
		$event.preventDefault();
		$scope.currentCriteria = criteria;
		Query(criteria);
	};

    function _hasType(data, type) {
        var hasType = false;
        angular.forEach(data, function(o) {
            if (hasType || o.Type == type && o.Count > 0)
                hasType = true;
        });
        return hasType;
    }

	function Query(criteria) {
		if (!criteria) return;
		$scope.showNoResults = false;
		$scope.pagedIndicator = true;
		OrderSearch.search(criteria, function (list, count) {
			$scope.orders = list;
			$scope.settings.listCount = count;
			$scope.showNoResults = list.length == 0;
			$scope.pagedIndicator = false;
		}, $scope.settings.currentPage, $scope.settings.pageSize);
		$scope.orderSearchStat = criteria;
	}
}]);