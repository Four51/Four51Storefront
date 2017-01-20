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
		controller: 'ReportViewController'
	};
	return obj;
});

four51.app.directive('orderreport', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/orderReport.html',
		controller: 'ReportViewController'
	};
	return obj;
});

four51.app.directive('inventoryreport', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/inventoryReport.html',
		controller: 'ReportViewController'
	};
	return obj;
});

four51.app.directive('pendingapprovalreport', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/pendingApprovalReport.html',
		controller: 'ReportViewController'
	};
	return obj;
});

four51.app.directive('accountstatusreport', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/accountStatusReport.html',
		controller: 'ReportViewController'
	};
	return obj;
});

four51.app.directive('accounttransactionreport', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/accountTransactionReport.html',
		controller: 'ReportViewController'
	};
	return obj;
});

four51.app.directive('shipmentreport', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/Reporting/shipmentReport.html',
		controller: 'ReportViewController'
	};
	return obj;
});