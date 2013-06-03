'use strict';
four51.app.factory('ProductService', function($resource, $451, $api){
    var resource = $resource($451.api('Products/:interopID'), {interopID: '@ID'});

    return {
        get: function(param, successCall){
            return $api.resource(resource)
                .options({ persists: true, key: 'Product.' + param.interopID})
                .get(param, successCall);
        },
        search: function(categoryInteropID, searchTerm){
            if(!categoryInteropID && !searchTerm)
                return null;

            console.log('product query');
            return resource.query({'CategoryInteropID': categoryInteropID, 'SearchTerms': searchTerm ? searchTerm : ''});
        }
    }
});