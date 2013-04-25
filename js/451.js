/* Four51 Global Namespace */

var $451 = (function() {
	var property = '';
	function json_filter(input,query) {
		var result = [];
		var query_on = query.indexOf(':') > -1 ? query.split(':') : [property,query];
		angular.forEach(input, function(stat) {
			if (stat[query_on[0]].toLowerCase() === query_on[1].toLowerCase())
				result.push(stat);
		});

		return result;
	}

	function getFromSessionOrLocalStorage(key) {
		// so when a value is set to storage that is null the value stored is the string 'undefined'. that sucks
		var session = sessionStorage[key];
		if (session != null && session != 'undefined')
			return session;

		return localStorage[key] || null;
	}

	function setToSessionOrLocalStorage(key,value,persist) {
		persist ?
			localStorage[key] = value :
			sessionStorage[key] = value;
		return value;
	}

	return {
		filter: {
			// default json property when not specified in filter attribute as Type:Standard
			on: function(val) {
				property = val;
				return this;
			},
			for: function(input, query) {
				return json_filter(input, query);
			}
		},
		get: function(key) {
			return getFromSessionOrLocalStorage(key);
		},
		set: function(key,value,persist) {
			setToSessionOrLocalStorage(key,value,persist);
		},
        clear: function(){
            console.log('clear storage');
            localStorage.clear();
            sessionStorage.clear();
        },
        apiURL: function(path){return '/api/451Order/' + path;} //TODO:needs some smarts to build this
	};
})();
