four51.app.factory('AddressList', ['$q', '$resource', '$451', function($q, $resource, $451) {
	var cache = [];
	function _then(fn, data, count) {
		if (angular.isFunction(fn))
			fn(data, count);
	}

	var _query = function(success, page, pagesize, key, editable) {
		page = page || 1;
		pagesize = pagesize || 100;
		if (typeof cache[(page-1) * pagesize] == 'object' && typeof cache[(page * pagesize) - 1] == 'object') {
			_then(success, cache, cache.length);
		}
		else {
			$resource($451.api('address')).get({ editable: editable, key: key, page: page, pagesize: pagesize}).$promise.then(function (list) {
				for (var i = 0; i <= list.Count - 1; i++) {
					if (typeof cache[i] == 'object') continue;
					cache[i] = list.List[i - (page - 1) * pagesize] || i;
				}
				_then(success, cache, list.Count);
			});
		}
	};

	var _shipping = function(success) {
		$resource($451.api('address/shipping')).get().$promise.then(function (list) {
			_then(success, list.List, list.Count);
		});
	};

	var _billing = function(success) {
		$resource($451.api('address/billing')).get().$promise.then(function (list) {
			_then(success, list.List, list.Count);
		});
	};

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
	};

	var _clear = function() {
		cache.splice(0, cache.length);
	};

	var _contains = function(comparer) {
		var does = false;
		angular.forEach(cache, function(address) {
			if (does) return;
			does = address.ID == comparer.ID;
		});
		return does;
	};

	return {
		query: _query,
		delete: _delete,
		clear: _clear,
		contains: _contains,
		billing: _billing,
		shipping: _shipping
	}
}]);