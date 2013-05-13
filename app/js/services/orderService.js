four51.app.factory('OrderService', function($resource, $http, $451, $api) {
	var r = $resource($451.api('order/:id'), { id: '@id' });
	return {
		get: function(id) {
			return $api.resource(r).options({ persists: false, key: 'Order'}).get(id);
		}
	}
});



