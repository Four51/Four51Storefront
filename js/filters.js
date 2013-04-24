'use strict';

/* Filters */

$451.app.filter('orderstatsFilter', function() {
	return function(input, query) {
		if (!query) return input;
		return $451.filter.on('Type').for(input,query);
	}
});