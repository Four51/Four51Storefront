four51.app.factory('SavedCreditCard', ['$resource', '$rootScope', '$451', function($resource, $rootScope, $451) {
	function _then(fn, data) {
        if (angular.isFunction(fn)) {
            fn(data);
        }
    }

    var _query = function(success) {
		$resource($451.api('savedcreditcard')).query().$promise.then(function(list) {
	        _then(success, list);
		});
    };

	var _delete = function(card, success) {
		$resource($451.api('savedcreditcard')).delete(card, function() {
			_then(success);
		});
	};

    return {
        query: _query,
	    delete: _delete
    };
}]);