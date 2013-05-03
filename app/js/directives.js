'use strict';

/* Directives */

$451.app.directive('authorization', function($location, $dialog) {
	var obj = {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			scope.$on('event:auth-loginRequired', function() {
				$location.path('login');
			});
			scope.$on('event:auth-loginConfirmed', function(scope, url) {
				var location = url.split('/');
				$location.path(location[location.length-1]);
			});
		}
	};
	return obj;
});

