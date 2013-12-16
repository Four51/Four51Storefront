four51.app.directive('orderhistorydetails', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/reporting/orderHistoryDetailsView.html'
	}
	return obj;
});

four51.app.directive('orderhistorysummary', function($location, Order, User) {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/reporting/orderHistorySummaryView.html'
	}
	return obj;
});

four51.app.directive('lineitemhistorygrid', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/reporting/lineItemHistoryGridView.html'
	}
	return obj;
});
