four51.app.factory('MessageList', ['$q', '$resource', '$451', function($q, $resource, $451) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	var _query = function(success) {
		var messages = store.get('451Cache.Messages');
		messages ? _then(success, messages) :
			$resource($451.api('message')).query().$promise.then(function(list) {
				store.set('451Cache.Messages', list);
				_then(success, list);
			});
	}

	var _delete = function(messages, success) {
		store.remove('451Cache.Messages');

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