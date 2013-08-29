four51.app.factory('Order', function($resource, $451) {
    var _get = function(id, success) {
        $resource($451.api('order')).get({'id': id }).$promise.then(function(o) {
            if (angular.isFunction(success))
                success(o);
        });
    }

    var _save = function(order, success) {
        $resource($451.api('order')).save(order).$promise.then(function(o) {
            if (angular.isFunction(success))
                success(o);
        });
    }

    var _delete = function(success) {
        $resource($451.api('order')).delete().$promise.then(function() {
            if (angular.isFunction(success))
                success();
        });
    }

    return {
        get: _get,
        save: _save,
        delete: _delete
    }
});