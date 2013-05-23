four51.app.factory('MessageService', function($resource, $451, $api) {
	var resource = $resource($451.api('message'), {}, {
		'get': { method: 'GET', isArray: true }
	});

	return {
		get: function() {
			return $api.resource(resource).options({ persists: false, key: 'Messages'}).get();
		}
	}
});