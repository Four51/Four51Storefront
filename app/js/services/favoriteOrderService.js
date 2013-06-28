four51.app.factory('FavoriteOrderService', function($resource, $451, $api) {
	var resource = $resource($451.api('favoriteorder'), { }, {
		'query': { method: 'GET', isArray: true },
		'delete': { method: 'DELETE' }
	});
	return {
		query: function() {
            $451.clear('FavoriteOrders');
			return $api.resource(resource).options({ persists: true, key: 'FavoriteOrders'}).query();
		},
		save: function(order) {
			resource.save(order);
			$451.clear('Order.' + order.ID);
		},
		delete: function(o) {
			angular.forEach(o, function(order) {
				if (order.Selected) {
					resource.delete(order);
				}
			});
			return this.query();
		}
	}
});