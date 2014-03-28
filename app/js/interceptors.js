four51.app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push(['$q', '$rootScope', '$451', 'Security', function($q, $rootScope, $451, Security) {
		function appendAuth(config) {
			config.headers['Authorization'] = Security.auth();
			return config;
		}

		return {
			'request': function(config) {
				return appendAuth(config) || $q.when(appendAuth(config));
			},
			'response': function(response) {
				// using status code 202 [Created] to represent the authentication token has been created. it fits the RFC spec and makes the authentication handling much more RESTy
				if (response.status === 202) {
                    Security.init(response.data, response.headers()["www-authenticate"]);
                    $rootScope.$broadcast('event:auth-loginConfirmed', response.data);
				}

				//if ($451.debug && typeof response.data == 'object')
				//	console.log(response.data);

				return response || $q.when(response);
			},
			'responseError': function(response) {
				if (response.status === 401) { // unauthorized
					$rootScope.$broadcast('event:auth-loginRequired');
                    return $q.reject(response);
				}

				// login failed for:
				if (response.status == 403) {
					$rootScope.$broadcast('event:auth-loginFailed', response.data.Message);
                    return $q.reject(response);
				}

				if (response.status != 200) {
                    //return $q.reject(response);
					throw response;
				}

				return $q.reject(response);
			}
		};
	}]);
}]);