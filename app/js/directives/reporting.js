four51.app.directive('orderhistorydetails', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/orderHistoryDetailsView.html'
	}
	return obj;
});

four51.app.directive('orderhistorysummary', function($location, Order, User) {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/orderHistorySummaryView.html'
	}
	return obj;
});

four51.app.directive('lineitemhistorygrid', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/lineItemHistoryGridView.html'
	}
	return obj;
});

four51.app.directive('lineitemreport', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/lineItemReport.html'
	};
	return obj;
})
