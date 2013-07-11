four51.app.factory('MessageListService', function($resource, $451, $api) {
	var resource = $resource($451.api('message'), { }, {
		'query': { method: 'GET', isArray: true },
		'delete': { method: 'DELETE' }
	});
	return {
		query: function() {
            $451.clear('Messages');
			return $api.resource(resource).
				options({ persists: true, key: 'Messages', ttl: 60000 }).query();
		},
		delete: function(m) {
			angular.forEach(m, function(msg, i) {
                console.log('Is ' + i + ' selected? ' + msg.Selected);
				if (msg.Selected) {
					resource.delete(msg);
				}
			});
            return this.query();
		}
	}
});