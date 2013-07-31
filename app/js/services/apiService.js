four51.app.factory('$api', function($451) {
	var resource, options;

	function fromRest(method, data, callback) {
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
            if(callback && d) callback(d);
			return d;
		});
	}

	function fromCache(callback) {
		var c = $451.cache(options.key);
        if (callback && c) callback(c);
        return c;
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
		query: function(callback) {
			return fromCache(callback) || fromRest('query', callback);
		},
		get: function(data, callback) {
            return fromCache(callback) || fromRest('get', data, callback);
		},
		save: function(data, callback) {
			return fromRest('save', data, callback);
		},
		delete: function(data, callback) {
			fromRest('delete', data, callback);
        }
	};
});