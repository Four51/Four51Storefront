'use strict'

four51.app.config(function($httpProvider) {
	$httpProvider.interceptors.push(function($q, $rootScope, $451, SecurityService) {
		function appendAuth(config) {
			config.headers['Authorization'] = SecurityService.authHeader();
			return config;
		}

		return {
			'request': function(config) {
				return appendAuth(config);
			},
			'response': function(response) {
				// using status code 202 [Created] to represent the authentication token has been created. it fits the RFC spec and makes the authentication handling much more RESTy
				if (response.status === 202) {
                    SecurityService.init(response.data, response.headers()["www-authenticate"]);
				}

				if ($451.debug && typeof response.data == 'object')
					console.debug(response.data);

				return response;
			},
			'responseError': function(response) {
				if (response.status === 401) { // unauthorized
					$rootScope.$broadcast('event:auth-loginRequired');
                    return $q.reject(response);
				}

				if (response.status == 403) {
					$rootScope.$broadcast('event:auth-loginFailed', response.data.Message);
                    return $q.reject(response);
				}

				if (response.status != 200) {
                    return $q.reject(response);
					//throw response;
				}

				return $q.reject(response);
			}
		};
	});
});