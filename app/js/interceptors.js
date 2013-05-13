'use strict'

four51.app.config(function($httpProvider) {
	$httpProvider.interceptors.push(function($q, $rootScope, $451) {
		var buffer = [];
		return {
			'request': function(config) {
				console.log('request'); console.dir(config);
				var auth = $451.cache("Auth");
				config.headers['Authorization'] = auth == null ? null : auth;
				return config;
			},
			'response': function(response) {
				console.log('response'); console.dir(response);
				// using status code 202 [Created] to represent the authentication token has been created. it fits the RFC spec and makes the authentication handling much more RESTy
				if (response.status === 202) {
					$rootScope.$broadcast('event:auth-loginConfirmed', buffer[0] ? buffer[0].config.url : '/', response.data);
				}
				// bug in FF forced angular to create workaround. hence the headers() function
				var auth = response.headers()['www-authenticate'];
				if (auth)
					$451.cache("Auth", auth, true);

				if ($451.debug)
					console.dir(response.data);

				return response;
			},
			'responseError': function(response) {
				console.log('responseError'); console.dir(response);
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