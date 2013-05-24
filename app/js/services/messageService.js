four51.app.factory('MessageService', function($resource, $451, $api) {
	var resource = $resource($451.api('message'), {}, {
		'get': { method: 'GET', isArray: true },
		'delete': { method: 'DELETE', isArray: true }
	});

	return {
		get: function() {
			return $api.resource(resource).options({ persists: false, key: 'Messages'}).get();
		},
		delete: function(m) {
			angular.forEach(m, function(msg) {
				if (msg.Selected) {
					resource.delete(msg, function() {
						$451.slice(m, msg);
					});
				}
			});
			return m;
		}
	}
});