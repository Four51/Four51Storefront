four51.app.directive('orderhistoryheader', function() {
	var obj = {
		restrict: 'E',
		scope: {
			order: '='
		},
		templateUrl: 'partials/reporting/orderHistoryHeaderView.html'
	}
	return obj;
});

four51.app.directive('orderhistoryfooter', function() {
	var obj = {
		restrict: 'E',
		scope: {
			order: '='
		},
		templateUrl: 'partials/reporting/orderHistoryFooterView.html'
	}
	return obj;
});

four51.app.directive('lineitemhistorygrid', function() {
	var obj = {
		restrict: 'E',
		scope: {
			order: '='
		},
		templateUrl: 'partials/reporting/lineItemHistoryGridView.html'
	}
	return obj;
});
