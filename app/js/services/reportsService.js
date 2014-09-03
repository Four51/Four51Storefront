four51.app.factory('Report', ['$resource','$q', '$451', 'Error', function($resource, $q, $451, Error) {
	var cache = [], download = null;
	function _then(fn, data, count) {
		if (angular.isFunction(fn)) {
			fn(data, count);
		}
	};

	function _extend(report) {
		report.AvailableTypes = {
			"Order": "Order",
			"LineItem": "Line Item",
			"Inventory": "Inventory",
			"PendingApproval": "Pending Approval",
			"SpendingAccountStatus": "Account Status",
			"SpendingAccountTransaction": "Account Transactions",
			"Shipment": "Shipment Report"
		};
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

	var _download = function(id, success, error, page, pagesize) {
		//page = page || 1;
		//pagesize = pagesize || 100;
		if (typeof cache[(page - 1) * pagesize] == 'object' && typeof cache[(page * pagesize) - 1] == 'object') {
			download.Data = cache;
			_then(success, download, cache.length);
		}
		else {
			$resource($451.api('report/:id/download'), { id: '@id' }).get({ id: id, page: page, pagesize: pagesize }).$promise.then(
				function (data) {
					for (var i = 0; i <= data.RowCount - 1; i++) {
						if (typeof cache[i] == 'object') continue;
						cache[i] = data.Data[i - (page - 1) * pagesize] || i;
					}
					data.Data = cache;
					download = data;
					_then(success, data, data.RowCount);
				},
				function (ex) {
					if (error)
						error(Error.format(ex));
				}
			);
		}
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
	};

	var _clear = function() {
		cache.splice(0, cache.length);
		download = null;
	};

	return {
		query: _query,
		save: _save,
		get: _get,
		delete: _delete,
		download: _download,
		clear: _clear
	};
}]);