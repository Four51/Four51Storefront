four51.app.factory('UserService', function($resource, $api, $451){
	var service = $resource($451.api('user'));
	var authenticated = true;

	return {
		login: function(user) {
			$api.resource(service).options({persists: true, key: 'User'}).get(user);
		},
		current: $451.cache('User'),
		isAuthenticated: authenticated
	};
});