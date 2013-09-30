four51.app.factory('SpendingAccount', function($resource, $451, $angularCacheFactory){
    var cache = $angularCacheFactory.get('451Cache');
    function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

    var _query = function(success) {
        if (cache.get('accounts')) {
            var accounts = cache.get('accounts');
	        _then(success, accounts);
        }
        else {
            return $resource($451.api('spendingaccount')).query().$promise.then(function(list) {
                cache.put('accounts', list);
               _then(success, list);
            });
        }
    }
    return {
        query: _query
    };
});