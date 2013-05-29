four51.app.factory('MessageService', function($resource, $location, $451, $api) {
	var resource = $resource($451.api('message/:id'), { id: '@id' });

	return {
		get: function(param) {
			return $api.resource(resource)
				.options({persists: true, key: 'Message.' + param.id}).get(param);
		},
		delete: function(msg, fn) {
			resource.delete(msg, function() {
				$451.clear('Message.' + msg.ID).clear('Messages');
				fn();
			});
		},
		save: function(msg, fn) {
			resource.save(msg, function() {
				$451.clear('Messages');
				fn();
			})
		}
	}
});