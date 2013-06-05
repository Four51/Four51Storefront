'use strict';
four51.app.factory('ProductService', function($resource, $451, $api){
    var resource = $resource($451.api('Products/:interopID'), {interopID: '@ID'});
    function variantHasPriceSchedule(product, scheduleType){
        if(!product.Variants)
            return false;
        for(var i = 0; i < product.Variants.length; i++){
            if(product.Variants[i][scheduleType])
                return true;
        }
        return false;
    }
    return {
        get: function(param, successCall){
            return $api.resource(resource)
                .options({ persists: false, key: 'Product.' + param.interopID})
                .get(param, successCall);
        },
        search: function(categoryInteropID, searchTerm){
            if(!categoryInteropID && !searchTerm)
                return null;

            console.log('product query');
            return resource.query({'CategoryInteropID': categoryInteropID, 'SearchTerms': searchTerm ? searchTerm : ''});
        },
        HasVariantOverridePS: function(product, scheduleType){
            return variantHasPriceSchedule(product, scheduleType)
        }
    }
});