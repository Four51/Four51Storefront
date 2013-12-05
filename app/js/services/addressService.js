four51.app.factory('Address', function($resource, $451, Error){
    function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

	function _extend(address) {	}

    var _get = function(id, success) {
		var address = store.get('451Cache.Address.' + id);
	    address ? (function() { _extend(address); _then(success, address); })() :
            $resource($451.api('address/:id'), { id: '@id' }).get({ id: id }).$promise.then(function(add) {
                store.set('451Cache.Address.' + id, add);
	            _extend(add);
                _then(success, add);
            });
    }

    var _save = function(address, success, error) {
        return $resource($451.api('address')).save(address).$promise.then(
		    function(add) {
		        store.remove('451Cache.Addresses');
	            store.set('451Cache.Address.' + add.ID, add);
		        _extend(add);
	            _then(success, add);
	        },
	        function(ex) {
		        error(Error.format(ex));
	        }
        );
    }

    var _delete = function(address, success) {
        return $resource($451.api('address')).delete(address).$promise.then(function() {
	        store.remove('451Cache.Addresses');
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

four51.app.factory('AddressList', function($q, $resource, $451) {
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
});