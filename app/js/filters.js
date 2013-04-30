'use strict';

/* Filters */

$451.app.filter('orderstatsFilter', function() {
	return function(input, query) {
		if (input.length === 0) return;
		if (!query) return input;
		return $451.filter.on('Type').for(input,query);
	}
});