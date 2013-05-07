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

	function getLocalStor(key, isObject) {
		var local = localStorage[key];
        if(local)
            return isObject ? JSON.parse(local) : local;
        else
            return null;
	}
    function getSessionStor(key, isObject){
        // so when a value is set to storage that is null the value stored is the string 'undefined'. that sucks
        var session = sessionStorage[key];
        if (session == null || session == 'undefined' || session == 'null')
            return null;
        return isObject ? JSON.parse(session) : session;

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
        getSession: function(key, isObject) {
            return getSessionStor(key, isObject);
        },
        setSession: function(key,value,isObject) {
            sessionStorage[key] = isObject ? JSON.stringify(value) : value;
            return value;
        },
		getLocal: function(key, isObject) {
            return getLocalStor(key, isObject);
		},
		setLocal: function(key,value,isObject) {
            localStorage[key] = isObject ? JSON.stringify(value) : value;
            return value;
		},
        clear: function(){
            localStorage.clear();
            sessionStorage.clear();
        },
        apiURL: function(path){return '/api/451Order/' + path;} //TODO:needs some smarts to build this
	};
})();
