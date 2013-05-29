four51.app.factory('UserService', function($resource, $api, $451){
	var service = $resource($451.api('user'));
	var authenticated = true;

	return {
		login: function(user) {
			$451.clear('User'); // just in case the cache stuck around for some reason. we're logging in so we don't want to use the cache item
			$api.resource(service).options({persists: true, key: 'User'}).get(user);
		},
		current: $451.cache('User'),
		isAuthenticated: authenticated
	};
});