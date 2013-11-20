four51.app.factory('Message', function($resource, $451) {
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
});

four51.app.factory('MessageList', function($q, $resource, $451) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

    var _query = function(success) {
		var messages = store.get('451Cache.Messages');
		messages ? _then(success, messages) :
	        $resource($451.api('message')).query().$promise.then(function(list) {
		        store.set('451Cache.Messages', list);
	            _then(success, list);
	        });
    }

	var _delete = function(messages, success) {
		store.remove('451Cache.Messages');

		var queue = [];
		angular.forEach(messages, function(msg) {
			if (msg.Selected) {
				queue.push((function() {
					var d = $q.defer();
					$resource($451.api('message')).delete(msg).$promise.then(function() {
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