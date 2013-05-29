four51.app.factory('MessageListService', function($resource, $451, $api) {
	var resource = $resource($451.api('message'), { }, {
		'query': { method: 'GET', isArray: true },
		'delete': { method: 'DELETE' }
	});
	return {
		query: function() {
			return $api.resource(resource).
				options({ persists: true, key: 'Messages', ttl: 60000 }).query();
		},
		delete: function(m) {
			angular.forEach(m, function(msg) {
				if (msg.Selected) {
					resource.delete(msg, function() {
						$451.slice(m, msg);
						$451.clear('Messages');
					});
				}
			});
			return m;
		}
	}
});