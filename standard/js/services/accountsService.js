four51.app.factory('SpendingAccount', ['$resource', '$rootScope', '$451', function($resource, $rootScope, $451) {
	function _then(fn, data) {
        if (angular.isFunction(fn)) {
            fn(data);
	        $rootScope.$broadcast('event:SpendingAccountUpdate', data);
        }
    }

	function _extend(list) {
		angular.forEach(list, function(i) {
			i.ForPurchase = i.AccountType.PurchaseCredit;
		});
	}

    var _query = function(success) {
		return $resource($451.api('spendingaccount')).query().$promise.then(function(list) {
			_extend(list);
		   _then(success, list);
		});
    }

    return {
        query: _query
    };
}]);