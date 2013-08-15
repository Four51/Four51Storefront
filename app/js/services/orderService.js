four51.app.factory('OrderService', function($resource, $451, $api) {
	var service = $resource($451.api('order/:id'), { id: '@id' });
	return {
		get: function(param, callback) {
			return $api.resource(service)
				.options({ persists: true, key: 'Order.' + param.id})
				.get({id: param}, callback);
		},
		repeat: function(order) {
			//TODO: add repeat functionality when order submission is available
		},
        addToOrder: function(lineItem){
            //if variantinteropid is null, it's a static w/out vars.
            console.dir({quantity: quantity, productInteropID: productInteropID, variantInteropID: variantInteropID} );
        },
        delete: function(order, callback) {
            // we don't actually allow the deletion of orders.
            // this is just cancelling the current shopping cart
            $api.resource(service)
                .delete(function() {
                    $451.clear('Order.' + order.ID);
                    callback();
            });
        },
        save: function(order, callback) {
            $api.resource(service)
                .options({ persists: true, key: 'Order.' + order.ID})
                .save(order, callback);
        }
	};
});
