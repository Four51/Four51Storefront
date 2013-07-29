four51.app.factory('FavoriteOrderService', function($resource, $451, $api) {
	var service = $resource($451.api('favoriteorder'), { }, {
		'query': { method: 'GET', isArray: true },
		'delete': { method: 'DELETE' }
	});
	return {
		query: function() {
            $451.clear('FavoriteOrders');
			return $api.resource(service).options({ persists: true, key: 'FavoriteOrders'}).query();
		},
		save: function(order) {
            $451.clear('Order.' + order.ID);
            $api.resource(service).save(order);
		},
		delete: function(o) {
			angular.forEach(o, function(order) {
				if (order.Selected) {
					$api.resource(service).delete(order);
				}
			});
			return this.query();
		}
	}
});