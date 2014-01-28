four51.app.factory('SpendingAccount', function($resource, $rootScope, $451){
	function _then(fn, data) {
        if (angular.isFunction(fn)) {
            fn(data);
	        $rootScope.$broadcast('event:SpendingAccountUpdate', data);
        }
    }

    var _query = function(success) {
		return $resource($451.api('spendingaccount')).query().$promise.then(function(list) {
		   _then(success, list);
		});
    }

    return {
        query: _query
    };
});
