four51.app.factory('$api', function($451) {
	var resource, options;

	function fromRest(method, data) {
		// cache for api calls will always be stored in localStorage.
		// to avoid caching simply do not define the options.persists property in your service
		return resource[method](data, function(d) {
			if (options.persists) {
				// will probably always be an object, but testing for that just to be safe
				// then testing for the length so we don't store an empty object
				if (typeof d == 'object' && (d.length > 0 || Object.keys(d).length > 0))
					// persists will always be true
					$451.cache(options.key, d, options);
			}
			return d;
		});
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
		},
		save: function(data) {
			return fromCache() || fromRest('save', data);
		},
		delete: function(data) {
			fromRest('delete', data);
		},
		custom: function(method, data) {
			return fromCache() || fromRest(method, data);
		}
	};
});