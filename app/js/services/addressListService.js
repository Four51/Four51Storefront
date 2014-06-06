four51.app.factory('AddressList', ['$q', '$resource', '$451', function($q, $resource, $451) {
	var cache = [];
	function _then(fn, data, count) {
		if (angular.isFunction(fn))
			fn(data, count);
	}

	var _query = function(success, page, pagesize) {
		page = page || 1;
		pagesize = pagesize || 100;
		if (typeof cache[(page-1) * pagesize] == 'object' && typeof cache[(page * pagesize) - 1] == 'object') {
			_then(success, cache, cache.length);
		}
		else {
			$resource($451.api('address')).get({ page: page, pagesize: pagesize}).$promise.then(function (list) {
				for (var i = 0; i <= list.Count - 1; i++) {
					if (typeof cache[i] == 'object') continue;
					cache[i] = list.List[i - (page - 1) * pagesize] || i;
				}
				_then(success, cache, list.Count);
			});
		}
	}

	var _delete = function(addresses, success) {
		var queue = [];
		angular.forEach(addresses, function(add) {
			if (add.Selected) {
				queue.push((function() {
					var d = $q.defer();
					$resource($451.api('address')).delete(add).$promise.then(function() {
						d.resolve();
					});
					return d.promise;
				})());
			}
		});

		$q.all(queue).then(function() {
			cache.splice(0, cache.length);
			_then(success);
		});
	}

	return {
		query: _query,
		delete: _delete
	}
}]);