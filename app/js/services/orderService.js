four51.app.factory('Order', function($resource, $rootScope, $451, Security, Error) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
		$rootScope.$broadcast('event:orderUpdate', data);
	}

	function _extend(order) {
		order.isEditable = order.Status == 'Unsubmitted' || order.Status == 'Open';
		angular.forEach(order.LineItems, function(item) {
			item.OriginalQuantity = item.Quantity; //needed to validate qty changes compared to available quantity
			angular.forEach(item.Specs, function(spec) {
				if (spec.ControlType == 'File' && spec.File && spec.File.Url.indexOf('auth') == -1)
					spec.File.Url += "&auth=" + Security.auth();
			});
			item.SpecsLength = Object.keys(item.Specs).length;
		});
	}

	var _get = function(id, success) {
		var currentOrder = store.get('451Cache.Order.' + id);
		currentOrder ? (function() { _extend(currentOrder);	_then(success, currentOrder); })() :
	        $resource($451.api('order')).get({'id': id }).$promise.then(function(o) {
		        _extend(o);
		        store.set('451Cache.Order.' + id, o);
	            _then(success, o);
	        });
    }

    var _save = function(order, success, error) {
        $resource($451.api('order')).save(order).$promise.then(
	        function(o) {
		        store.set('451Cache.Order.' + o.ID, o);
		        _extend(o);
	            _then(success, o);
	        },
	        function(ex) {
		        error(Error.format(ex));
	        }
        );
    }

    var _delete = function(order, success, error) {
        $resource($451.api('order')).delete().$promise.then(
	        function() {
		        store.remove('451Cache.Order.' + order.ID);
	           _then(success);
	        },
	        function(ex) {
		        error(Error.format(ex));
	        }
        );
    }

    var _submit = function(order, success, error) {
        $resource($451.api('order'), { }, { submit: { method: 'PUT' }}).submit(order).$promise.then(
	        function(o) {
		        store.set('451Cache.Order.' + o.ID);
		        _extend(o);
	            _then(success,o);
	        },
	        function(ex) {
		        error(Error.format(ex));
	        }
        );
    }

    return {
        get: _get,
        save: _save,
        delete: _delete,
        submit: _submit
    }
});