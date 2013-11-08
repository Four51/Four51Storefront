four51.app.factory('SpendingAccount', function($resource, $451){
    function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

    var _query = function(success) {
		var accounts = store.get('451Cache.Accounts');
	    accounts ? _then(success, accounts) :
            $resource($451.api('spendingaccount')).query().$promise.then(function(list) {
                store.set('451Cache.Accounts', list);
	            _extend(list);
               _then(success, list);
            });
    }

    return {
        query: _query
    };
});