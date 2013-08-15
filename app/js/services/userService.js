four51.app.factory('UserService', function($resource, $api, $451, SecurityService){
	var service = $resource($451.api('user'));
    var extend = function(user) {
        user.Permissions.contains = function(value) {
            return $451.contains(user.Permissions, value);
        }
    };

	return {
        login: function(user) {
            $api.resource(service).options({persists: true, key: 'User'}).get(user, function(u) { extend(u); });
        },
        logout: function() {
            $451.clear();
            SecurityService.logout();
        },
        save: function(user) {
            return $api.resource(service).options({ persists: true, key: 'User' }).save(user, function(u) { extend(u); });
        },
        get: function() {
            return $api.resource(service).options({persists: true, key: 'User'}).get({}, function(u) { extend(u); });
        },
        refresh: function() {
            // retrieves the Four51User.Current from the API. Use this when other business logic may have altered the state of the user
            // and you need that reflected in the user cache object. EX: cancelling an order and updating the CurrentOrderID
            $451.clear('User');
            return $api.resource(service).options({ persists: true, key: 'User'}).get({}, function(u) { extend(u); });
        }
	};
});