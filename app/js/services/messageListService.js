four51.app.factory('MessageList', ['$q', '$resource', '$451', function($q, $resource, $451) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	var _query = function(success) {
		$resource($451.api('message')).query().$promise.then(function(list) {
			_then(success, list);
		});
	}

	var _delete = function(messages, success) {
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
			_then(success);
		});
	}

	return {
		query: _query,
		delete: _delete
	}
}]);