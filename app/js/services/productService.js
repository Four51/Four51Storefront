'use strict';
four51.app.factory('ProductService', function($resource, $451){
    var productAPI = $resource($451.api('Product/:interopID'), {interopID: '@ID'}, {'search': {method: 'GET', isArray:true}});

    return {
        search: function(categoryInteropID, searchTerm){
            if(!categoryInteropID && !searchTerm)
                return null;
            return productAPI.search({'CategoryInteropID': categoryInteropID, 'SearchTerms': searchTerm ? searchTerm : ''});
        },
        getOne: function(interopID){
            return productAPI.get({interopID: interopID})
        }
    }
});