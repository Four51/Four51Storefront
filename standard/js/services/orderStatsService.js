four51.app.factory('OrderSearchCriteria', ['$resource', '$http', '$451', function($resource, $http, $451) {

    var _query = function(success) {
        $resource($451.api('orderstats')).query().$promise.then(function(stats) {
            if (angular.isFunction(success))
                success(stats);
        });
    }

	return {
		query: _query
	}
}]);