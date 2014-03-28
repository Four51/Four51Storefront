four51.app.factory('FavoriteOrder', ['$q', '$resource', '$451', function($q, $resource, $451) {
	var _cacheName = '451Cache.FavoriteOrders.' + $451.apiName;
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

    var _query = function(success) {
		var favorites = store.get(_cacheName);
	    favorites ? _then(success, favorites) :
	        $resource($451.api('favoriteorder'), {}, { isArray: true}).query(function(fav) {
		        store.set(_cacheName, fav);
	           _then(success, fav);
	        });
    }

    var _save = function(order, success) {
	    store.remove(_cacheName);
	    store.remove('451Cache.Order.' + order.ID);
        $resource($451.api('favoriteorder'), {},  { 'save': { method: 'POST', isArray: true }}).save(order).$promise.then(function(fav) {
	        store.set(_cacheName, fav);
            _then(success, fav);
        });
    }

	var _delete = function(orders, success) {
		store.remove(_cacheName);

		var queue = [];
		angular.forEach(orders, function(o) {
			if (o.Selected) {
				queue.push((function() {
					var d = $q.defer();
					$resource($451.api('favoriteorder')).delete(o).$promise.then(function() {
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
		save: _save,
		delete: _delete
	}
}]);