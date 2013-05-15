'use strict';

/* Directives */

four51.app.directive('authorization', function($route, $451, LoginService) {
	var obj = {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			scope.isAuthenticated = true;

			scope.$on('event:auth-loginRequired', function() {
				scope.isAuthenticated = false;
			});
			scope.$on('event:auth-loginConfirmed', function() {
				scope.isAuthenticated = true;
				$route.reload();
			});
			scope.Login = function() {
				LoginService.login(this.user);
			};
		}
	};
	return obj;
});