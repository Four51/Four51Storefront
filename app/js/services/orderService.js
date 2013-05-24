four51.app.factory('OrderService', function($resource, $451, $api) {
	var r = $resource($451.api('order/:id'), { id: '@id' });
	return {
		get: function(param) {
			return $api.resource(r).options({ persists: true, key: 'Order.' + param.id}).get(param);
		},
        addToOrder: function(quantity, productInteropID, variantInteropID){
            //if variantinteropid is null, it's a static w/out vars.
            console.dir({quantity: quantity, productInteropID: productInteropID, variantInteropID: variantInteropID} );
        }
	}
});



