'use strict';
four51.app.factory('ProductService', function($resource, $451){
    var productAPI = $resource($451.api('Products/:interopID'), {interopID: '@ID'});

    return {
        search: function(categoryInteropID, searchTerm){
            if(!categoryInteropID && !searchTerm)
                return null;

            console.log('product query');
            return productAPI.query({'CategoryInteropID': categoryInteropID, 'SearchTerms': searchTerm ? searchTerm : ''});
        },
        getOne: function(interopID){
            console.log('product get');
            return productAPI.get({interopID: interopID})
        }
    }
});