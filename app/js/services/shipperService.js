four51.app.factory('Shipper', ['$resource', '$451', function($resource, $451) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	function buildCacheID(order) {
		var cacheID = "451Cache.Shippers." + order.ID;
		angular.forEach(order.LineItems, function(item) {
			cacheID += item.Quantity + item.Product.InteropID + item.ShipAddressID;
		});
		return cacheID;
	}

    var _query = function(order, success) {
	    if (!order) return null;
	    //var id = buildCacheID(order),
		//    shippers = store.get(id);
		//shippers ? _then(success, shippers) :
	        $resource($451.api('shipper'), { id: '@id' }).query({ id: order.ID }).$promise.then(function(list) {
		//        store.set(id, list);
	            _then(success, list);
	        });
    }

    return {
        query: _query
    }
}]);