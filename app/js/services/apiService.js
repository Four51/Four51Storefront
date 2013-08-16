four51.app.factory('$api', function($451) {
	var resource, options;

	function fromRest(method, data, success, error) {
        var callback_error = function(e) {
            if (error) error(e);
        };

        // cache for api calls will always be stored in localStorage.
        // to avoid caching simply do not define the options.persists property in your service
        var callback_success = function(d) {
            if (options.persists) {
                // will probably always be an object, but testing for that just to be safe
                // then testing for the length so we don't store an empty object
                if (typeof d == 'object' && (d.length > 0 || Object.keys(d).length > 0))
                // persists will always be true
                    $451.cache(options.key, d, options);
            }
            if(success && d) success(d);
            return d;
        };

		return resource[method](data, callback_success, callback_error);
	};

	function fromCache(success, error) {
		var c = $451.cache(options.key);
        if (success && c) success(c);
        if (error && !c) error();
        return c;
	};

	return {
		options: function(obj) {
			options = obj;
			return this;
		},
		resource: function(r) {
			resource = r;
			return this;
		},
		query: function(success, error) {
			return fromCache(success, error) || fromRest('query', success, error);
		},
		get: function(data, success, error) {
            return fromCache(success, error) || fromRest('get', data, success, error);
		},
		save: function(data, success, error) {
			return fromRest('save', data, success, error);
		},
		delete: function(data, success, error) {
			fromRest('delete', data, success, error);
        }
	};
});