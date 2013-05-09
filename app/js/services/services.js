'use strict';

$451.app.factory('OrderStatsService', function($resource, $http) {
    // query is not necessary here. it's just an example of how to add other methods
    return $resource($451.apiURL('orderstats'));
});

$451.app.factory('OrderSearchService', function($resource, $http) {
	return $resource($451.apiURL('ordersearch'), {}, {
		'get': { method: 'GET', isArray: true }
	});
});

$451.app.factory('OrderService', function($resource, $http) {
	return $resource($451.apiURL('order/:id'), { id: '@id' });
});

$451.app.factory('LoginService', function($resource){
	var isAuthenticated = false;
    return $resource($451.apiURL('login'));
});
