'use strict';

/* Filters */

four51.app.filter('orderstats', function($451) {
	return function(input, query) {
		if (input.length === 0) return;
		if (!query) return input;
		return $451.filter.on('Type').for(input,query);
	}
});