four51.app.factory('FavoriteOrder', function($resource, $451, $angularCacheFactory) {
	var cache = $angularCacheFactory.get('451Cache');

	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

    var _query = function(success) {
	    if (cache.get('favoriteorders')) {
		    var favorites = cache.get('favoriteorders');
		    _then(success, favorites);
	    }
	    else {
	        return $resource($451.api('favoriteorder')).query(function(fav) {
	           _then(success, fav);
	        });
	    }
    }

    var _save = function(order,success) {
        $resource($451.api('favoriteorder')).save(order).$promise.then(function(fav) {
	        cache.put('favoriteorders', fav);
            _then(success, fav);
        });
    }

    var _delete = function(orders,success) {
        angular.forEach(orders, function(order, key) {
            if (order.Selected) {
	            orders.splice(key, 1);
                $resource($451.api('favoriteorder')).delete(order);
            }
        });
	    cache.put('favoriteorders', orders);
       _then(success, orders);
    }

	return {
		query: _query,
		save: _save,
		delete: _delete
	}
});