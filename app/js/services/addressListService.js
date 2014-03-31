four51.app.factory('AddressList', ['$q', '$resource', '$451', function($q, $resource, $451) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	var _query = function(success) {
		var addresses = store.get('451Cache.Addresses');
		addresses ? _then(success, addresses) :
			$resource($451.api('address')).query().$promise.then(function(list) {
				store.set('451Cache.Addresses', list);
				_then(success, list);
			});
	}

	var _delete = function(addresses, success) {
		store.remove('451Cache.Addresses');

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
			_then(success);
		});
	}

	return {
		query: _query,
		delete: _delete
	}
}]);