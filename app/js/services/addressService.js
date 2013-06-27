four51.app.factory('AddressService', function($resource, $route, $api, $451){
    var service = $resource($451.api('address/:id'), { id: '@id' });

    return {
        get: function(param) {
            return $api.resource(service).options({ persists: true, key: 'Address.' + param.id}).get(param);
        },
        save: function(address, callback) {
            service.save(address, function(response) {
                $451.clear('Addresses');
                callback();
            });
        },
        delete: function(address, callback) {
            service.delete(address, function(response) {
                $451.clear('Address.' + address.InteropID);
                $451.clear('Addresses');
                callback();
            });
        }
    };
});

four51.app.factory('AddressListService', function($resource, $451, $api) {
    var resource = $resource($451.api('address'), {}, {
        'query': { method: 'GET', isArray: true },
        'delete': { method: 'DELETE' }
    });

    return {
        query: function() {
            $451.clear('Addresses');
            return $api.resource(resource).
                options({ persists: true, key: 'Addresses'}).query();
        },
        delete: function(addresses) {
            angular.forEach(addresses, function(address, i) {
               if (address.Selected) {
                   resource.delete(address);
               }
            });
            return this.query();
        }
    }
});