/* Four51 Global Namespace */

four51.app.factory('$451', function(Cache) {
	function json_filter(input, options) {
		var result = [];
		angular.forEach(input, function(row) {
			if (row[options.Property].toLowerCase() === options.Value.toLowerCase())
				result.push(row);
		});
		return result;
	}

	function clearStorageMechanisms() {
		Cache.removeAll();
		localStorage.clear();
	}

	function putCache(id,val,persist) {
		// probably going to need to test for object type. i'm not sure strings will stringify
		persist ? localStorage.setItem(id,JSON.stringify(val)) : Cache.put(id,val);
		return val;
	}

	function getCache(id) {
		// probably going to need to test for object type. pretty sure JSON.parse will yack on a string
		return Cache.get(id) || JSON.parse(localStorage.getItem(id));
	}

	function sliceByValue(array, value) {
		var index = array.indexOf(value);
		array.splice(index, index+1);
		//return array;
	}

	return {
		debug: true,
		appname: four51.app.name,
		api: function(path) {
            //todo: get appname with out using window?
            return '/api/' + window.location.pathname.split('/')[1] + "/" + path;
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
				Cache.remove(key); localStorage.removeItem(key);
		},
		filter: function(input, options) {
			return json_filter(input, options);
		},
		slice: function(array, value) {
			sliceByValue(array, value);
		}
	};
});
