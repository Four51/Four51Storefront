four51.app.factory('OrderSearchService', function($resource, $http, $451) {
	return $resource($451.api('ordersearch'), {}, {
		'get': { method: 'GET', isArray: true }
	});
});