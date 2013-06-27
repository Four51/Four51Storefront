four51.app.factory('UserService', function($resource, $api, $451){
	var service = $resource($451.api('user'));
	var authenticated = true;
    var currentUser = $451.cache('User');

	return {
		login: function(user) {
			$451.clear('User');
			$api.resource(service).options({persists: true, key: 'User'}).get(user);
		},
        save: function(user) {
            service.save(user, function(response) {
                $451.cache('User', user, { persists: true, key: 'User' });
            });
        },
		current: currentUser,
		isAuthenticated: authenticated,
        permission: { // really unnecessary but I think it might make it simpler to read when used
            contains: function(value) {
                return $451.contains(currentUser.Permissions, value);
            }
        }
	};
});