four51.app.factory('SavedReports', function($resource, $451) {
	function _then(fn, data) {
		if (angular.isFunction(fn)) {
			fn(data);
		}
	}

	function _extend(report) {
		switch (report.ReportType) {
			case 'LineItem':
			default:
				break;
		}
		report.AvailableTypes = {"LineItem": "Line Item", "Order": "Order" };
		if (report.ColumnOptions)
			report.ColumnOptionsLength = Object.keys(report.ColumnOptions).length;
	}

	var _query = function(success) {
		var reports = store.get('451Cache.SavedReports');
		reports ? (function() { _extend(reports); _then(success, reports); })() :
			$resource($451.api('savedreports')).query().$promise.then(function(list) {
				store.set('451Cache.SavedReports', list);
				_extend(list);
				_then(success, list);
			});
	}

	var _get = function(id, success) {
		$resource($451.api('savedreports/:id'), { id: '@id' }).get({ id: id }).$promise.then(function(data) {
			_extend(data);
			_then(success, data);
		});
	}

	return {
		query: _query,
		get: _get
	};
});