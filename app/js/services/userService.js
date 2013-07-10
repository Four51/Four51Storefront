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
        logout: function() {
            currentUser = null;
            $451.clear('User');
        },
        get: function() {
            // this should never hit the api
            currentUser = $451.cache('User');
            return currentUser;
        },
        refresh: function() {
            // retrieves the Four51User.Current from the API. Use this when other business logic may have altered the state of the user
            // and you need that reflected in the user cache object. EX: cancelling an order and updating the CurrentOrderID
            $451.clear('User');
            $api.resource(service).options({ persists: true, key: 'User'}).get({});
        },
		current: currentUser,
		isAuthenticated: authenticated,
        permissions: { // really unnecessary but I think it might make it simpler to read when used
            contains: function(value) {
                if (currentUser == null) return false;
                return $451.contains(currentUser.Permissions, value);
            }
        }
	};
});