four51.app.factory('Address', function($resource, $451, $angularCacheFactory){
    var cache = $angularCacheFactory.get('451Cache');

    function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

    var _get = function(id, success) {
        if (cache.get('address' + id)) {
            var address = cache.get('address' + id);
            _then(success, address);
        }
        else {
            return $resource($451.api('address/:id'), { id: '@id' }).get({ id: id }).$promise.then(function(add) {
                cache.put('address' + id, add);
                _then(success, add);
            });
        }
    }

    var _save = function(address, success) {
        return $resource($451.api('address')).save(address).$promise.then(function(add) {
            cache.put('address' + add.ID, add);
            _then(success, add);
        });
    }

    var _delete = function(address, success) {
        return $resource($451.api('address')).delete(address).$promise.then(function() {
            cache.remove('address' + address.ID);
            _then(success);
        });
    }

    return {
        get: _get,
        save: _save,
        delete: _delete
    };
});

four51.app.factory('AddressList', function($resource, $451, $angularCacheFactory) {
	var cache = $angularCacheFactory.get('451Cache');

	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

    var _query = function(success) {
	    if (cache.get('addresses')) {
		    var addresses = cache.get('addresses');
		    _then(success, addresses);
	    }
	    else {
	        $resource($451.api('address')).query().$promise.then(function(list) {
		        cache.put('addresses', list);
	            _then(success, list);
	        });
	    }
    }

    var _delete = function(addresses, success) {
        angular.forEach(addresses, function(add) {
            if (add.Selected) {
	            $resource($451.api('address')).delete(add);
            }
        });
	    cache.put('addresses');
        _then(success);
    }

    return {
        query: _query,
        delete: _delete
    }
});