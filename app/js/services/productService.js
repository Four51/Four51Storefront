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
        }
    }
});

four51.app.factory('VariantService', function($resource, $451, $api){
	var resource = $resource($451.api('hiddenvariant'));
	return {
		search: function(productInteropID, specOptionIDs, callback){
			console.log('hiddenvariant query');
			return resource.get({'ProductInteropID': productInteropID, 'SpecOptionIDs': specOptionIDs}, callback);
		}
	}
});
