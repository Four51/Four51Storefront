/* Four51 Global Namespace */

four51.app.factory('$451', function(Cache) {
	function json_filter(input, options, op) {
		if (input == null || options == null) return;
		var result = [];
		angular.forEach(input, function(row) {
            if (row[options.Property] === undefined && !options instanceof Array) return;

			var checkRow = function(opt){
				if ((row[opt.Property].toString()).toLowerCase() === (opt.Value.toString()).toLowerCase()){
					return row;
				}
			}

			var add;
			if (options instanceof Array){ //does an OR on the list of conditions. could add to it to optionally have OR/AND
				for(var i = 0; i < options.length; i++){
					add = checkRow(options[i]);
					if(add)
						break;
				}
			}else{
				add = checkRow(options);
			}

			if(add){
				result.push(row);
				if(op) op(row)
			}
		});
		return result;
	}

	function clearStorageMechanisms() {
		Cache.removeAll();
		localStorage.clear();
	}

	function putCache(id,val,options) {
		// probably going to need to test for object type. i'm not sure strings will stringify
		var current = new Date();
		options.persists ?
			localStorage.setItem(id, JSON.stringify({ ttl: options.ttl ? addMillisecondsToDate(options.ttl).getTime() : null, data: val })) :
			Cache.put(id,val);
		return val;
	}

	function getCache(id) {
		// probably going to need to test for object type. pretty sure JSON.parse will yack on a string
		var temp = Cache.get(id);
		if (temp) return temp;

		var local = JSON.parse(localStorage.getItem(id));
		if (local === null) return null;

		return checkCacheTTL(local);
	}

	function checkCacheTTL(cache) {
		if (cache.ttl === null) return cache.data;
		var current = new Date();
		if (cache.ttl - current.getTime() >= 0)
			return cache.data;
		return null;
	}

	function addMillisecondsToDate(ms) {
		var d = new Date();
		d.setMilliseconds(d.getMilliseconds() + ms);
		return d;
	}

    function arrayContainsValue(array, value) {
        return array.indexOf(value) > -1;
    }


	return {
		debug: true,
		appname: four51.app.name,
		api: function(path) {
            //todo: get appname with out using window?
			var apiName = four51.app.ApiAppName ? four51.app.ApiAppName : window.location.pathname.split('/')[1];
            return '/api/' + apiName + "/" + path;
			//return '/api/451Order/' + path;
		},
		// cache is temporary. even refreshing the browser will clear the cache
		// getter attempts to retrieve based on the persistent state longevity of each type { cache, localstorage }
		cache: function(id, val, options) {
			return val ?
				putCache(id, val, options) :
				getCache(id);
		},
		clear: function(key) {
			!key ?
				clearStorageMechanisms():
				Cache.remove(key); localStorage.removeItem(key);
			return this;
		},
		filter: function(input, options, op) {
			return json_filter(input, options, op);
		},
        contains: function(array, value) {
            return arrayContainsValue(array, value);
        }
	};
});
