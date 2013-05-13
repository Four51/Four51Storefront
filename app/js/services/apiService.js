four51.app.factory('$api', function($resource, $451) {
	var resource, options;

	function fromRest(method, data) {
		var data = resource[method](data);
		$451.cache(options.key, data, options.persists);
		return data;
	}

	function fromCache() {
		return $451.cache(options.key);
	}

	return {
		options: function(obj) {
			options = obj;
			return this;
		},
		resource: function(r) {
			resource = r;
			return this;
		},
		query: function() {
			return fromCache() || fromRest('query');
		},
		get: function(data) {
			return fromCache() || fromRest('get', data);
		}
	};
});