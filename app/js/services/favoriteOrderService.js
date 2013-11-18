four51.app.factory('FavoriteOrder', function($resource, $451) {
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
        $resource($451.api('favoriteorder'), {},  { 'save': { method: 'POST', isArray: true }}).save(order).$promise.then(function(fav) {
	        store.set(_cacheName, fav);
            _then(success, fav);
        });
    }

    var _delete = function(orders, success) {
        angular.forEach(orders, function(order, key) {
            if (order.Selected) {
	            orders.splice(key, 1);
                $resource($451.api('favoriteorder')).delete(order);
            }
        });
	    store.set(_cacheName, orders);
       _then(success, orders);
    }

	return {
		query: _query,
		save: _save,
		delete: _delete
	}
});