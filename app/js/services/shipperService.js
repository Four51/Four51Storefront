four51.app.factory('ShipperService', function($resource, $api, $451) {
    var service = $resource($451.api('shipper'));

    return {
        query: function() {
            return $api.resource(service).options({ persists: false, key: 'Shippers' }).query();
        }
    };
});