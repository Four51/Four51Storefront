'use strict';

/* Directives */

four51.app.directive('authorization', function($location, LoginService) {
	var obj = {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			scope.$on('event:auth-loginRequired', function() {
				$location.path('login');
			});
			scope.$on('event:auth-loginConfirmed', function(scope, url, user) {
				var location = url.split('/');
				LoginService.confirmed(location[location.length-1], user);
			});
		}
	};
	return obj;
});