/* Four51 Global Namespace */

four51.app.factory('$451', function(Cache, localStorageService) {
	function json_filter(input,query) {
		var result = [];
		var query_on = query.indexOf(':') > -1 ? query.split(':') : [property,query];
		angular.forEach(input, function(stat) {
			if (stat[query_on[0]].toLowerCase() === query_on[1].toLowerCase())
				result.push(stat);
		});

		return result;
	}

	function clearStorageMechanisms() {
		Cache.removeAll();
		localStorageService.clearAll();
	}

	function putCache(id,val,persist) {
		persist ? localStorageService.add(id,val) : Cache.put(id,val);
		return val;
	}
	function getCache(id) {
		return Cache.get(id) || localStorageService.get(id);
	}

	return {
		debug: false,
		appname: four51.app.name,
		api: function(path) {
			return '/api/' + this.appname + "/" + path;
		},
		// cache is temporary. even refreshing the browser will clear the cache
		// getter attempts to retrieve based on the persistent state longevity of each type { cache, localstorage }
		cache: function(id, val, persist) {
			return val ?
				putCache(id, val, persist || false) :
				getCache(id);
		},
		clear: function(key) {
			if (!key)
				clearStorageMechanisms();
			else
				Cache.remove(key); localStorageService.remove(key);
		},
		filter: {
			// default json property when not specified in filter attribute as Type:Standard
			on: function(val) {
				property = val;
				return this;
			},
			for: function(input, query) {
				return json_filter(input, query);
			}
		}
	};
});
