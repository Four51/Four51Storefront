four51.app.factory('Shipper', function($resource, $451, $angularCacheFactory) {
	var cache = $angularCacheFactory.get('451Cache');

	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	function buildCacheID(order) {
		var cacheID = "shippers" + order.ID;
		angular.forEach(order.LineItems, function(item, i) {
			cacheID += item.Quantity + item.Product.InteropID + item.ShipAddressID;
		});
		return cacheID;
	}

    var _query = function(order, success) {
	    var id = buildCacheID(order);
	    if (cache.get(id)) {
		    var shippers = cache.get(id);
		    _then(success, shippers);
	    }
	    else {
	        $resource($451.api('shipper')).query().$promise.then(function(list) {
		        cache.put(id, list);
	            _then(success, list);
	        });
	    }
    }

    return {
        query: _query
    }
});