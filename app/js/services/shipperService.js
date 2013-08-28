four51.app.factory('Shipper', function($resource, $451) {

    var _query = function(success) {
        $resource($451.api('shipper')).query().$promise.then(function(list) {
            if (angular.isFunction(success))
                success(list);
        })
    }

    return {
        query: _query
    }
});