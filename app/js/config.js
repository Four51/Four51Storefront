'use strict'

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
