four51.app.factory('Address', function($resource, $451){
    var _get = function(id, success) {
        return $resource($451.api('address/:id'), { id: '@id' }).get({ id: id }).$promise.then(function(add) {
            if (angular.isFunction(success))
                success(add);
        });
    }

    var _save = function(address, success) {
        return $resource($451.api('address')).save(address).$promise.then(function(add) {
            if (angular.isFunction(success))
                success(add);
        });
    }

    var _delete = function(address, success) {
        return  $resource($451.api('address')).delete(address).$promise.then(function() {
            if (angular.isFunction(success))
                success();
        });
    }

    return {
        get: _get,
        save: _save,
        delete: _delete
    };
});

four51.app.factory('AddressList', function($resource, $451) {

    var _query = function(success) {
        return $resource($451.api('address')).query().$promise.then(function(list) {
            if (angular.isFunction(success))
                success(list);
        });
    }

    var _delete = function(addresses, success) {
        angular.forEach(addresses, function(add) {
            if (add.Selected) $resource($451.api('address')).delete(add);
        });
        if (angular.isFunction(success))
            success();
    }

    return {
        query: _query,
        delete: _delete
    }
});