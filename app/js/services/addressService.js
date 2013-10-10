four51.app.factory('Address', function($resource, $451){
    function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

	function _extend(address) {
		//set default value to US if it's a new address and other values
		address.Country = address.Country || 'US';
		address.IsBilling = address.IsBilling || true;
		address.IsShipping = address.IsShipping || true;
	}

    var _get = function(id, success) {
		var address = store.get('451Cache.Address.' + id);
	    address ? (function() { _extend(address); _then(success, address); })() :
            $resource($451.api('address/:id'), { id: '@id' }).get({ id: id }).$promise.then(function(add) {
                store.set('451Cache.Address.' + id, add);
	            _extend(add);
                _then(success, add);
            });
    }

    var _save = function(address, success) {
        return $resource($451.api('address')).save(address).$promise.then(function(add) {
            store.set('451Cache.Address.' + add.ID, add);
	        _extend(add);
            _then(success, add);
        });
    }

    var _delete = function(address, success) {
        return $resource($451.api('address')).delete(address).$promise.then(function() {
            store.remove('451Cache.Address.' + address.ID);
            _then(success);
        });
    }

    return {
        get: _get,
        save: _save,
        delete: _delete
    };
});

four51.app.factory('AddressList', function($resource, $451) {
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
        angular.forEach(addresses, function(add) {
            if (add.Selected) {
	            $resource($451.api('address')).delete(add);
            }
        });
	    store.set('451Cache.Addresses');
        _then(success);
    }

    return {
        query: _query,
        delete: _delete
    }
});