
four51.app.factory('OrderStatsService', function($resource, $http, $451, $api) {
	var r = $resource($451.api('orderstats'));

	return {
		query: function() {
			return $api.resource(r).options({ persists: true, key: 'OrderStats'}).query();
		}
	}
});