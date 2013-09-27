'use strict'

/* Config */

four51.app.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(false); // this doesn't actually work right now. maybe a bug fix in angular let's us use this soon
}]);

four51.app.config(function($provide) {
	$provide.decorator('$exceptionHandler', function($delegate, $injector) {
		return function $broadcastingExceptionHandler(ex, cause) {
			$delegate(ex, cause);
			$injector.get('$rootScope').$broadcast('exception', ex, cause);
		}
	});
});

four51.app.run(function($angularCacheFactory) {
    $angularCacheFactory('451Cache', {
        capacity: 100, // we should never have more than 1 user per instance
        maxAge: 86400000,
        cacheFlushInterval: 86400000,
        aggressiveDelete: true,
        storageMode: 'localStorage'
    });
});
