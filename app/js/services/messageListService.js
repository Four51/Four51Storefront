four51.app.factory('MessageList', ['$q', '$resource', '$451', function($q, $resource, $451) {
	var cache = [];
	function _then(fn, data, count) {
		if (angular.isFunction(fn))
			fn(data, count);
	}

	function _query(page, pagesize, success) {
		page = page || 1;
		pagesize = pagesize || 100;
		// first check that the requested page hasn't already been retrieved
		if (typeof cache[(page-1) * pagesize] == 'object' && typeof cache[(page * pagesize) - 1] == 'object') {
			_then(success, cache, cache.length);
		}
		else {
			// if not, get them from the api and update the cache
			$resource($451.api('message')).get({ page: page, pagesize: pagesize }).$promise.then(function (list) {
				for (var i = 0; i <= list.Count - 1; i++) {
					if (typeof cache[i] == 'object') continue;
					cache[i] = list.List[i - (page - 1) * pagesize] || i;
				}
				console.log(cache.length);
				_then(success, cache, list.Count);
			});
		}
	}

	function _delete(messages, success) {
		var queue = [];
		angular.forEach(messages, function(msg) {
			if (msg.Selected) {
				queue.push((function() {
					var d = $q.defer();
					$resource($451.api('message')).delete(msg).$promise.then(function() {
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