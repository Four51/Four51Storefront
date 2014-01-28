four51.app.factory('SpendingAccount', function($resource, $451){
	var _cacheName = '451Cache.Accounts.' + $451.apiName;
	function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

    var _query = function(success) {
	    // taking caching out because accounts can be shared across mutliple users and the balances could be altered during session
		//var accounts = store.get(_cacheName);
	    //accounts ? _then(success, accounts) :
          return $resource($451.api('spendingaccount')).query().$promise.then(function(list) {
                //store.set(_cacheName, list);
               _then(success, list);
            });
    }

    return {
        query: _query
    };
});
