four51.app.factory('Order', function($resource, $rootScope, $451, $angularCacheFactory) {
	var cache = $angularCacheFactory.get('451Cache');

	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	function _extend(order) {
		order.isEditable = order.Status == 'Unsubmitted' || order.Status == 'Open';
	}

	var _get = function(id, success) {
		if (cache.get('order' + id)) {
			var currentOrder = cache.get('order' + id);
			_extend(currentOrder);
			_then(success, currentOrder);
		}
		else {
	        $resource($451.api('order')).get({'id': id }).$promise.then(function(o) {
		        cache.put('order' + id, o);
	            _then(success, o);
	        });
		}
    }

    var _save = function(order, success) {
        $resource($451.api('order')).save(order).$promise.then(function(o) {
	        cache.put('order' + o.ID, o);
	        _extend(o);
            _then(success, o);
        });
    }

    var _delete = function(order, success) {
        $resource($451.api('order')).delete().$promise.then(function() {
	        cache.remove('order' + order.ID);
           _then(success);
        });
    }

    var _submit = function(order, success) {
        $resource($451.api('order'), { }, { submit: { method: 'PUT' }}).submit(order).$promise.then(function(o) {
	        cache.put('order' + o.ID);
	        _extend(o);
            _then(success,o);
        });
    }

    return {
        get: _get,
        save: _save,
        delete: _delete,
        submit: _submit
    }
});