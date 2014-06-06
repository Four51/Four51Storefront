four51.app.factory('OrderSearch', ['$resource', '$451', function($resource, $451) {
	var cache = [], statCache;
	function _then(fn, data, count) {
		if (angular.isFunction(fn))
			fn(data, count);
	}

    var _search = function(stat, success, page, pagesize) {
	    page = page || 1;
	    pagesize = pagesize || 100;
	    (stat.DateRangeFrom && typeof stat.DateRangeFrom != 'string') ? stat.DateRangeFrom = stat.DateRangeFrom.toISOString() : null;
	    (stat.DateRangeTo && typeof stat.DateRangeTo != 'string') ? stat.DateRangeTo = stat.DateRangeTo.toISOString() : null;

	    stat.page = page || 1;
	    stat.pagesize = pagesize || 10;

	    if (stat || stat != statCache) {
		    statCache = stat;
		    cache.splice(0, cache.length);
	    }
	    if (typeof cache[(page-1) * pagesize] == 'object' && typeof cache[(page * pagesize) - 1] == 'object') {
		    _then(success, cache, cache.length);
	    }
	    else {
		    $resource($451.api('order')).get(stat).$promise.then(function (list) {
			    for (var i = 0; i <= list.Count - 1; i++) {
				    if (typeof cache[i] == 'object') continue;
				    cache[i] = list.List[i - (page - 1) * pagesize] || i;
			    }
			    _then(success, cache, list.Count);
		    });
	    }
    }

	return {
		search: _search
	};
}]);