'use strict';
four51.app.factory('ProductService', function($resource, $451, $api){
    var resource = $resource($451.api('Products/:interopID'), {interopID: '@ID'});

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
        //this isn't going to live here. just for now.
        modifyProductScope: function (product, variant, scope){
            if(variant){
                scope.variant = variant;
                scope.priceSchedule = variant.StandardPriceSchedule ? variant.StandardPriceSchedule : product.StandardPriceSchedule; //include user permissions to decide to show
                scope.StaticSpecGroups = variant.StaticSpecGroups || product.StaticSpecGroups;
            }else{
                scope.priceSchedule = variantHasPriceSchedule(product, 'StandardPriceSchedule') ? null : product.StandardPriceSchedule; //don't show price schedule if variant overrides parent PS
                scope.StaticSpecGroups = product.StaticSpecGroups;
            }
            scope.showInventory = (product.QuantityAvailable || (scope.variant && scope.variant.QuantityAvailable)) && product.DisplayInventory == true; //add some logic around user permissions

            function variantHasPriceSchedule(product, scheduleType){
                if(!product.Variants)
                    return false;
                for(var i = 0; i < product.Variants.length; i++){
                    if(product.Variants[i][scheduleType])
                        return true;
                }
                return false;
            }
        }

    }
});