four51.app.factory('OrderSearch', ['$resource', '$451', function($resource, $451) {

    var _search = function(stat, success) {
	    (stat.DateRangeFrom && typeof stat.DateRangeFrom != 'string') ? stat.DateRangeFrom = stat.DateRangeFrom.toISOString() : null;
	    (stat.DateRangeTo && typeof stat.DateRangeTo != 'string') ? stat.DateRangeTo = stat.DateRangeTo.toISOString() : null;
        $resource($451.api('order'),{}, { 'get': { method: 'GET', isArray: true }}).get(stat).$promise.then(function(list) {
            if (angular.isFunction(success))
                success(list);
        });
    }

	return {
		search: _search
	};
}]);