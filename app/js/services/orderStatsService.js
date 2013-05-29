
four51.app.factory('OrderSearchCriteriaService', function($resource, $http, $451, $api) {
	var r = $resource($451.api('orderstats'));

	return {
		query: function() {
			return $api.resource(r).options({ persists: true, ttl: 60000, key: 'OrderSearchCriteria'}).query();
		}
	}
});