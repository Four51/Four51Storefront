four51.app.factory('FavoriteOrder', function($resource, $451) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

    var _query = function(success) {
		var favorites = store.get('451Cache.FavoriteOrders');
	    favorites ? _then(success, favorites) :
	        $resource($451.api('favoriteorder'), {}, { isArray: true}).query(function(fav) {
		        store.set('451Cache.FavoriteOrders', fav);
	           _then(success, fav);
	        });
    }

    var _save = function(order, success) {
        $resource($451.api('favoriteorder'), {},  { 'save': { method: 'POST', isArray: true }}).save(order).$promise.then(function(fav) {
	        store.set('451Cache.FavoriteOrders', fav);
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
	    store.set('451Cache.FavoriteOrders', orders);
       _then(success, orders);
    }

	return {
		query: _query,
		save: _save,
		delete: _delete
	}
});