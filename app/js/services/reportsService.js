four51.app.factory('Report', ['$resource','$q', '$451', 'Error', function($resource, $q, $451, Error) {
	function _then(fn, data) {
		if (angular.isFunction(fn)) {
			fn(data);
		}
	};

	function _extend(report) {
		report.AvailableTypes = {"LineItem": "Line Item"};
	};

	var _query = function(success) {
		$resource($451.api('report')).query().$promise.then(function(list) {
			_extend(list);
			_then(success, list);
		});
	};

	// do not extend reports. it will break the api serialization
	var _get = function(id, success, error) {
		$resource($451.api('report/:id'), { id: '@id' }).get({ id: id }).$promise.then(
			function(data) {
				_then(success, data);
			},
			function(ex) {
				if (error)
					error(Error.format(ex));
			}
		);
	};

	var _save = function(report, success, error) {
		$resource($451.api('report')).save(report).$promise.then(
			function(report) {
				_then(success, report);
			},
			function(ex) {
				if (error)
					error(Error.format(ex));
			}
		);
	};

	var _delete = function(reports, success, error) {
		var queue = [];
		angular.forEach(reports, function(report) {
			if (report.Selected) {
				queue.push((function() {
					var d = $q.defer();
					$resource($451.api('report')).delete({'id': report.ID}).$promise.then(
						function() {
							d.resolve();
						},
						function(ex) {
							d.reject(ex);
						}
					);
					return d.promise;
				})());
			}
		});

		$q.all(queue).then(
			function() {
				_then(success);
			},
			function(ex) {
				if (error)
					error(Error.format(ex));
			}
		);
	}

	var _download = function(id, success, error) {
		$resource($451.api('downloadreport/:id'), { id: '@id' }).get({ id: id }).$promise.then(
			function(data) {
				_then(success, data);
			},
			function(ex) {
				if (error)
					error(Error.format(ex));
			}
		);
	}

	return {
		query: _query,
		save: _save,
		get: _get,
		delete: _delete,
		download: _download
	};
}]);