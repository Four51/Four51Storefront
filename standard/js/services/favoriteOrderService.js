four51.app.factory('FavoriteOrder', ['$q', '$resource', '$451', function($q, $resource, $451) {
	var cache = [], searchCache;
	function _then(fn, data, count) {
		if (angular.isFunction(fn))
			fn(data, count);
	}

    var _query = function(success, search, page, pagesize) {
	    page = page || 1;
	    pagesize = pagesize || 100;
	    if (search || search != searchCache) {
		    searchCache = search;
		    cache = [];
	    }
	    if (typeof cache[(page-1) * pagesize] == 'object' && typeof cache[(page * pagesize) - 1] == 'object') {
		    _then(success, cache, cache.length);
	    }
	    else {
		    $resource($451.api('favoriteorder')).get({ searchTerm: search, page: page, pagesize: pagesize}).$promise.then(function (list) {
			    for (var i = 0; i <= list.Count - 1; i++) {
				    if (typeof cache[i] == 'object') continue;
				    cache[i] = list.List[i - (page - 1) * pagesize] || i;
			    }
			    _then(success, cache, list.Count);
		    });
	    }
    }

    var _save = function(order, success) {
        $resource($451.api('favoriteorder')).save(order).$promise.then(function(f) {
	        _then(success, f);
        });
    }

	var _delete = function(orders, success) {
		var queue = [];
		angular.forEach(orders, function(o) {
			if (o.Selected) {
				queue.push((function() {
					var d = $q.defer();
					$resource($451.api('favoriteorder')).delete(o).$promise.then(function() {
						d.resolve();
					});
					return d.promise;
				})());
			}
		});

		$q.all(queue).then(function() {
			cache.splice(0, cache.length);
			_then(success);
		});
	}

	return {
		query: _query,
		save: _save,
		delete: _delete
	}
}]);