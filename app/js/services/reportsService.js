four51.app.factory('Report', ['$resource', '$451', 'Error', function($resource, $451, Error) {
	function _then(fn, data) {
		if (angular.isFunction(fn)) {
			fn(data);
		}
	};

	function _extend(report) {
		switch (report.ReportType) {
			case 'LineItem':
			default:
				break;
		}
		report.AvailableTypes = {"LineItem": "Line Item", "Order": "Order" };
		if (report.ColumnOptions)
			report.ColumnOptionsLength = Object.keys(report.ColumnOptions).length;
	};

	var _query = function(success) {
		var reports = store.get('451Cache.Report');
		reports ? (function() { _extend(reports); _then(success, reports); })() :
			$resource($451.api('report')).query().$promise.then(function(list) {
				store.set('451Cache.Report', list);
				_extend(list);
				_then(success, list);
			});
	};

	var _get = function(id, success) {
		$resource($451.api('report/:id'), { id: '@id' }).get({ id: id }).$promise.then(
			function(data) {
				_extend(data);
				_then(success, data);
			},
			function(ex) {
				error(Error.format(ex));
			}
		);
	};

	var _save = function(report, success, error) {
		$resource($451.api('report')).save(report).$promise.then(
			function(report) {
				_extend(report);
				_then(success, report);
			},
			function(ex) {
				error(Error.format(ex));
			}
		);
	};

	return {
		query: _query,
		save: _save,
		get: _get
	};
}]);