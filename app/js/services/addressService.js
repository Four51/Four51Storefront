four51.app.factory('AddressService', function($resource, $route, $api, $451){
    var service = $resource($451.api('address/:id'), { id: '@id' });

    return {
        get: function(param) {
            return $api.resource(service).options({ persists: true, key: 'Address.' + param.id}).get(param);
        },
        save: function(address, callback) {
            $api.resource(service)
                .options({ persists: true, key: 'Address.' + address.ID })
                .save(address, function() {
                    if (callback) callback();
                });
        },
        delete: function(address, callback) {
            $api.resource(service)
                .delete(address, function() {
                    $451.clear('Address.' + address.InteropID);
                    $451.clear('Addresses');
                    if (callback) callback();
                });
        }
    };
});

four51.app.factory('AddressListService', function($resource, $451, $api) {
    var service = $resource($451.api('address'), {}, {
        'query': { method: 'GET', isArray: true },
        'delete': { method: 'DELETE' }
    });

    return {
        query: function() {
            $451.clear('Addresses');
            return $api.resource(service).
                options({ persists: true, key: 'Addresses'}).query();
        },
        delete: function(addresses) {
            angular.forEach(addresses, function(address, i) {
               if (address.Selected) {
                   $api.resource(service).delete(address);
               }
            });
            return this.query();
        }
    }
});