'use strict'

/* Config */

myapp.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(false); // this doesn't actually work right now. maybe a bug fix in angular let's us use this soon
}]);

