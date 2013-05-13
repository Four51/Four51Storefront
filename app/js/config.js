'use strict'

/* Config */

four51.app.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(false); // this doesn't actually work right now. maybe a bug fix in angular let's us use this soon
}]);

four51.app.factory('Cache', function($cacheFactory) {
	return $cacheFactory('Cache', { });
});