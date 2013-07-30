four51.app.factory('SpendingAccountService', function($resource, $api, $451){
    var service = $resource($451.api('spendingaccount'));

    return {
        query: function() {
            return $api.resource(service).options({ persists: true, key: 'SpendingAccounts' }).query();
        }
    };
});

four51.app.factory('ShipperService', function($resource, $api, $451) {
   var service = $resource($451.api('shipper'));

    return {
        query: function() {
            return $api.resource(service).options({ perists: false, key: 'Shippers' }).query();
        }
    };
});