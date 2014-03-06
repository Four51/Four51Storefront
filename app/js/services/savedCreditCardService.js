four51.app.factory('SavedCreditCard', function($resource, $rootScope, $451){
	function _then(fn, data) {
        if (angular.isFunction(fn)) {
            fn(data);
        }
    }

    var _query = function(success) {
		return $resource($451.api('savedcreditcard')).query().$promise.then(function(list) {
		   _then(success, list);
		});
    }

    return {
        query: _query
    };
});
