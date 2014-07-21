four51.app.directive('orderhistorydetails', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/orderHistoryDetailsView.html'
	};
	return obj;
});

four51.app.directive('orderhistorysummary', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/orderHistorySummaryView.html'
	};
	return obj;
});

four51.app.directive('lineitemhistorygrid', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/lineItemHistoryGridView.html'
	};
	return obj;
});

four51.app.directive('lineitemreport', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/lineItemReport.html',
		controller: ['$scope', function($scope) {
			$scope.open = function(cal, event) {
				event.preventDefault();
				event.stopPropagation();
				$scope[cal] = true;
			};
		}]
	};
	return obj;
});

four51.app.directive('orderreport', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/orderReport.html',
		controller: ['$scope', function($scope) {
			$scope.open = function(cal, event) {
				event.preventDefault();
				event.stopPropagation();
				$scope[cal] = true;
			};
		}]
	};
	return obj;
});

four51.app.directive('inventoryreport', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/inventoryReport.html',
		controller: ['$scope', function($scope) {
			$scope.open = function(cal, event) {
				event.preventDefault();
				event.stopPropagation();
				$scope[cal] = true;
			};
		}]
	};
	return obj;
});

four51.app.directive('pendingapprovalreport', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/pendingApprovalReport.html',
		controller: ['$scope', function($scope) {
			$scope.open = function(cal, event) {
				event.preventDefault();
				event.stopPropagation();
				$scope[cal] = true;
			};
		}]
	};
	return obj;
});

four51.app.directive('accountstatusreport', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/accountStatusReport.html',
		controller: ['$scope', function($scope) {
			$scope.open = function(cal, event) {
				event.preventDefault();
				event.stopPropagation();
				$scope[cal] = true;
			};
		}]
	};
	return obj;
});
