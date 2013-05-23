'use strict';

/* Filters */

four51.app.filter('orderstats', function($451) {
	return function(input, query) {
		if (input.length === 0) return;
		if (!query) return input;
		return $451.filter.on('Type').for(input,query);
	}
});

four51.app.filter('onproperty', function($451) {
	var defaults = {
		'OrderStats': 'Type',
		'Message': 'Box'
	};

	return function(input, query) {
		if (input.length === 0) return;
		if (!query) return input;
		query.Property = query.Property || defaults[query.Model]
		return $451.filter(input, query);
	}
});