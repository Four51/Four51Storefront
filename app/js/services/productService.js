'use strict';
$451.app.factory('ProductService', function($resource){
    var productAPI = $resource($451.apiURL('product/:interopID'), {interopID: '@ID'}, {'search': {method: 'POST', isArray:true}});
    console.log('cached declared');
    function cacheProduct(product){
        $451.setLocal("product-" + product.InteropID, product, true)
    }
    function getCachedProduct(interopID){
        return $451.getLocal("product-" + interopID, true)
    }
    return {
        search: function(categoryInteropID, searchTerm){

            console.log('calling product search: category:' + categoryInteropID + ' search: ' + searchTerm)

            var products = productAPI.search({'CategoryInteropID': categoryInteropID, 'SearchTerms': searchTerm}, function(){

                for(var i = 0; i < products.length; i++){

                    if(!getCachedProduct(products[i].InteropID)){
                        cacheProduct(products[i]);
                    }
                }
            });
            return products;
        },
        getOne: function(interopID){

            var cached = getCachedProduct(interopID);
            if(!cached){
                return productAPI.get({interopID: interopID}, function(data){
                    console.log('putting prodcut to the cache')
                    cacheProduct(data);
                });
            }
            else{
                console.log('returning cached product')
                return cached;
            }

        }
    }
});