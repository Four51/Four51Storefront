four51.app.factory('MessageListService', function($resource, $451, $api) {
	var service = $resource($451.api('message'), { }, {
		'query': { method: 'GET', isArray: true },
		'delete': { method: 'DELETE' }
	});
	return {
		query: function() {
            $451.clear('Messages');
			return $api.resource(service).
				options({ persists: true, key: 'Messages', ttl: 60000 }).query();
		},
		delete: function(m) {
			angular.forEach(m, function(msg, i) {
				$api.resource(service).delete(msg);
			});
            return this.query();
		}
	}
});