four51.app.factory('Message', function($resource, $451, $angularCacheFactory) {
	var cache = $angularCacheFactory.get('451Cache');

	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

    var _get = function(id, success) {
	    if (cache.get('message' + id)) {
		    var message = cache.get('message' + id);
		    _then(success, message);
	    }
        $resource($451.api('message/:id'), { id: '@id' }).get({ 'id': id}).$promise.then(function(msg) {
	        cache.put('message' + msg.ID, msg);
            _then(success, msg);
        });
    }

    var _delete = function(msg, success) {
        $resource($451.api('message')).delete(msg, function() {
	        cache.remove('message' + msg.ID);
            _then(success);
        });
    }

    var _save = function(msg, success) {
        $resource($451.api('message')).save(msg).$promise.then(function(m) {
	        cache.put('message' + m.ID, m);
            _then(success, m);
        });
    }

	return {
		get: _get,
		delete: _delete,
		save: _save
	}
});

four51.app.factory('MessageList', function($resource, $451, $angularCacheFactory) {
	var cache = $angularCacheFactory.get('451Cache');

	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

    var _query = function(success) {
	    if (cache.get('messages')) {
		    var messages = cache.get('messages');
		    _then(success, messages);
	    }
	    else {
	        $resource($451.api('message')).query().$promise.then(function(list) {
		        cache.put('messages', list);
	            _then(success, list);
	        });
	    }
    }

    var _delete = function(messages, success) {
        angular.forEach(messages, function(msg) {
            if (msg.Selected)
                $resource($451.api('message')).delete(msg);
        });
	    cache.put('messages', messages);
       _then(success,messages);
    }

    return {
        query: _query,
        delete: _delete
    }
});