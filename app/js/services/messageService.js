four51.app.factory('Message', ['$resource', '$451', function($resource, $451) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

    var _get = function(id, success) {
		var message = store.get('451Cache.Message.' + id);
		message ? _then(success, message) :
	        $resource($451.api('message/:id'), { id: '@id' }).get({ 'id': id}).$promise.then(function(msg) {
		        store.set('451Cache.Message.' + msg.ID, msg);
	            _then(success, msg);
	        });
    }

    var _delete = function(msg, success) {
        $resource($451.api('message')).delete(msg, function() {
	        store.remove('451Cache.Messages');
	        store.remove('451Cache.Message.' + msg.ID);
            _then(success);
        });
    }

    var _save = function(msg, success) {
        $resource($451.api('message')).save(msg).$promise.then(function(m) {
	        store.remove('451Cache.Messages');
	        store.set('451Cache.Message.' + m.ID, m);
            _then(success, m);
        });
    }

	return {
		get: _get,
		delete: _delete,
		save: _save
	}
}]);