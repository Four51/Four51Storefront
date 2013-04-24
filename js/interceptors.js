'use strict'


$451.app.config(function($httpProvider) {
	$httpProvider.interceptors.push(function($q, $rootScope) {
		return {
			'request': function(config) {
				var auth = $451.get('auth');
				config.headers['Authorization'] = auth == null ? null : '451 ' + auth;
				return config;
			},
			'response': function(response) {
				if (response.status === 202) {
					$451.set('auth', response.data.AuthenticationToken, false);
				}
				return response;
			},
			'responseError': function(response) {
				if (response.status === 401) { // unauthorized
					$rootScope.$broadcast('event:auth-loginRequired');
				}
				return response;
			}
		};
	});
});

/* interceptors

 function error(response) {
    if (response.status === 401) {
        var deferred = $q.defer();
		 authServiceProvider.pushToBuffer(response.config, deferred);
        $rootScope.$broadcast('event:auth-loginRequired');
        return deferred.promise;
    }
    return $q.reject(response);
 }

 return function(promise) {
    return promise.then(success,error);
 }
 }];
 $httpProvider.responseInterceptors.push(interceptor);
 }]);


/*
facial.provider('authService', function() {
	// holds all failed requests for re-request after login
	var buffer = [];

	this.pushToBuffer = function(config, deferred) {
		buffer.push({
			config: config,
			deferred: deferred
		});
	};

	this.$get = ['$rootScope', '$injector', function ($rootScope, $injector) {
		var $http; //initialized later because of circular dependency problem
		function retry(config, deferred) {
			$http = $http || $injector.get('$http');
			$http(config).then(function (response) {
				deferred.resolve(response);
			});
		}
		function retryAll() {
			var i;

			for (i = 0; i < buffer.length; ++i) {
				retry(buffer[i].config, buffer[i].deferred);
			}
			buffer = [];
		}

		return {
			loginConfirmed: function () {
				$rootScope.$broadcast('event:auth-loginConfirmed');
				retryAll();
			}
		};
	}];
});
*/