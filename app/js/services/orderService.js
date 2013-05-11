four51.app.factory('OrderService', function($resource, $http, $451) {
	var service = $resource($451.api('order/:id'), { id: '@id' });

	return {
		load: function(id) {
			return service.get(id);
		},
		user: function() {
			return $451.cache("User");
		}
	}
});

four51.app.factory('Cache', function($cacheFactory) {
	return $cacheFactory('Cache', { });
});

