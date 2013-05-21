four51.app.factory('LoginService', function($resource, $api, $451){
	var service = $resource($451.api('login'));

	return {
		login: function(user) {
			$api.resource(service).options({persists: true, key: 'User'}).save(user);
		}
	};
});