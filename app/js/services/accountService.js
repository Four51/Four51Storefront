four51.app.factory('SpendingAccountService', function($resource, $api, $451){
	var service = $resource($451.api('spendingaccount'));

	return {
	    query: function() {
	        return $api.resource(service).options({ persists: true, key: 'SpendingAccounts' }).query();
	    }
	};
});