'use strict'

$451.app.config(function($httpProvider) {
	$httpProvider.interceptors.push(function($q, $rootScope, $location) {
		var buffer = [];
		return {
			'request': function(config) {
				var auth = $451.getLocal('auth', false);
				config.headers['Authorization'] = auth == null ? null : auth;
				return config;
			},
			'response': function(response) {
				// using status code 201 to represent the authentication token has been created. it fits the RFC spec and makes the authentication handling much more RESTy
				if (response.status === 201) {
					$rootScope.$broadcast('event:auth-loginConfirmed', buffer[0] ? buffer[0].config.url : '/');
				}
				// bug in FF forced angular to create workaround. hence the headers() function
				var auth = response.headers()['www-authenticate'];
				if (auth) $451.setLocal('auth', auth, false);

				if ($451.debug) console.dir(response.data);
				return response;
			},
			'responseError': function(response) {
				buffer.splice(0, buffer.length,{
					config: response.config
				});
				if (response.status === 401) { // unauthorized
					$rootScope.$broadcast('event:auth-loginRequired');
					return false;
				}

				if (response.status != 200) {
					$rootScope.$broadcast('event:raise-Error', response);
					return false;
				}
				return response;
			}
		};
	});
});