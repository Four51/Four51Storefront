four51.app.factory('Message', function($resource, $451) {

    var _get = function(id, success) {
        $resource($451.api('message/:id'), { id: '@id' }).get({ 'id': id}).$promise.then(function(msg) {
            if (angular.isFunction(success))
                success(msg);
        });
    }

    var _delete = function(msg, success) {
        $resource($451.api('message')).delete(msg, function() {
            if (angular.isFunction(success))
                success();
        });
    }

    var _save = function(msg, success) {
        $resource($451.api('message')).save(msg).$promise.then(function(m) {
            if (angular.isFunction(success))
                success(m);
        });
    }

	return {
		get: _get,
		delete: _delete,
		save: _save
	}
});

four51.app.factory('MessageList', function($resource, $451) {

    var _query = function(success) {
        $resource($451.api('message')).query().$promise.then(function(list) {
            if (angular.isFunction(success))
                success(list);
        });
    }

    var _delete = function(messages, success) {
        angular.forEach(messages, function(msg) {
            if (msg.Selected)
                $resource($451.api('message')).delete(msg);
        });
        if (angular.isFunction(success))
            success();
    }

    return {
        query: _query,
        delete: _delete
    }
});