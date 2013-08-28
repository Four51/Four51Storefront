four51.app.factory('OrderSearch', function($resource, $451) {

    var _search = function(stat, success) {
        $resource($451.api('order'),{},
            { 'get': { method: 'GET', isArray: true }}
        ).get(stat).$promise.then(function(list) {
            if (angular.isFunction(success))
                success(list);
        });
    }

	return {
		search: _search
	};
});