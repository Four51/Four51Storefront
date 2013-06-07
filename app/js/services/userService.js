four51.app.factory('UserService', function($resource, $api, $451){
	var service = $resource($451.api('user'));
	var authenticated = true;
    function clear() {
        $451.clear('User');
    }

	return {
		login: function(user) {
			clear(); // just in case the cache stuck around for some reason. we're logging in so we don't want to use the cache item
			$api.resource(service).options({persists: true, key: 'User'}).get(user);
		},
        save: function(user) {
            service.save(user, function(response) {
                $451.cache('User', user, { persists: true, key: 'User' });
            });
        },
		current: $451.cache('User'),
		isAuthenticated: authenticated
	};
});