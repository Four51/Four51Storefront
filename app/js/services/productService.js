'use strict';
$451.app.factory('ProductService', function($resource){
    var productAPI = $resource($451.apiURL('product/:interopID'), {interopID: '@ID'}, {'search': {method: 'POST', isArray:true}});
    console.log('cached declared');

    var cachedProducts = {};//{product3: {Name:'product name', Description: 'product description'},product1: {Name:'product name1', Description: 'product description1'}, product4: {Name:'product name4', Description: 'product description 4'}};
    function findProduct(interopId){
        return cachedProducts[0];
    }
    return {
        search: function(categoryInteropID, searchTerm){
            console.log('calling product search: category:' + categoryInteropID + ' search: ' + searchTerm)

            var products = productAPI.search({'CategoryInteropID': categoryInteropID, 'SearchTerms': searchTerm}, function(){

                for(var i = 0; i < products.length; i++){

                    if(!cachedProducts[products[i].InteropID]){
                        cachedProducts[products[i].InteropID] = (products[i]);
                    }
                }
            });
            return products;
        },
        getOne: function(interopID){

            if(!cachedProducts[interopID]){
                return productAPI.get({interopID: interopID}, function(data){
                    cachedProducts[interopID] = data;
                });
            }
            else
                return cachedProducts[interopID];
        }
    }
});