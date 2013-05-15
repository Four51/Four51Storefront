four51.app.factory('LoginService', function($resource, $451){
	var service = $resource($451.api('login'));

	return {
		login: function(user) {
			var u = service.save(user);
		},
		confirmed: function(url, user) {
			$451.cache("User", user);
		}
	};
});