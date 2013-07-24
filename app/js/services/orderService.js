four51.app.factory('OrderService', function($resource, $451, $api) {
	var service = $resource($451.api('order/:id'), { id: '@id' });
	return {
		get: function(param, callback) {
			return $api.resource(service)
				.options({ persists: false, key: 'Order.' + param.id})
				.get(param, callback);
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
            service.delete(function(response) {
                $451.clear('Order.' + order.ID);
                if (callback) callback();
            });
        },
        save: function(order, callback) {
            $451.clear('Order.' + order.ID);
            service.save(order, function(data) {
                if (callback) callback(data);
                return data;
            });
        }
	};
});

// used to define order properties as dictated by business requirements
four51.app.factory('OrderConfigService', function() {
    var user, order;
    var setCostCenter = function() {
        // set the cost center if the user only has 1 assigned to them and the order doesn't already have a cost center assigned
        if (user.CostCenters.length == 1 && order.CostCenter == null) {
            order.CostCenter = user.CostCenters[0];
            // also need to set each individual lineitem because Order doesn't actually save the CostCenter
            angular.forEach(order.LineItems, function(n,i) {
                n.CostCenter = user.CostCenters[0];
            });
        }
    };

    return {
        costcenter: function(o, u) {
            order = o; user = u;
            if (order.Status == 'Unsubmitted') {
                setCostCenter();
            }
            return this;
        }
    };
});


