four51.app.factory('OrderSearchService', function($resource, $http, $api, $451) {
	var r = $resource($451.api('ordersearch'), {}, {
		'get': { method: 'GET', isArray: true }
	});

	return {
		search: function(stat) {
			return $api.resource(r).options({ persists: false, key: 'OrderSearch'}).get(stat);
		}
	};
});