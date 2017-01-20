four51.app.factory('Message', ['$resource', '$451', function($resource, $451) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

    var _get = function(id, success) {
		$resource($451.api('message/:id'), { id: '@id' }).get({ 'id': id}).$promise.then(function(msg) {
			_then(success, msg);
		});
    }

    var _delete = function(msg, success) {
        $resource($451.api('message')).delete(msg, function() {
            _then(success);
        });
    }

    var _save = function(msg, success) {
        $resource($451.api('message')).save(msg).$promise.then(function(m) {
            _then(success, m);
        });
    }

	return {
		get: _get,
		delete: _delete,
		save: _save
	}
}]);