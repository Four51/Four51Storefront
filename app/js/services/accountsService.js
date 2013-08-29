four51.app.factory('SpendingAccountService', function($resource, $451){

    var _query = function(success) {
        $resource($451.api('spendingaccount')).query().$promise.then(function(list) {
            if (angular.isFunction(success))
                success(list);
        });
    }
    return {
        query: _query
    };
});