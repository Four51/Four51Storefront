'use strict';

/* Filters */

myapp.filter('orderstatsFilter', function() {
	return function(input, query) {
		if (!query) return input;
		return $451.filter.on('Type').for(input,query);
	}
});