four51.app.factory('OrderService', function($resource, $451, $api) {
	var resource = $resource($451.api('order/:id'), { id: '@id' });
	return {
		get: function(param) {
			return $api.resource(resource)
				.options({ persists: true, key: 'Order.' + param.id})
				.get(param);
		},
		repeat: function(order) {
			//TODO: add repeat functionality when order submission is available
		},
        addToOrder: function(quantity, productInteropID, variantInteropID){
            //if variantinteropid is null, it's a static w/out vars.
            console.dir({quantity: quantity, productInteropID: productInteropID, variantInteropID: variantInteropID} );
        }
	}
});



