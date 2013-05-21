'use strict';

four51.app.controller('LoginCtrl', function LoginCtrl($scope, $route, LoginService) {
	$scope.template = { url: 'partials/login.html'};
	$scope.isAuthenticated = true;
	$scope.$on('event:auth-loginRequired', function() {
		$scope.isAuthenticated = false;
	});

	$scope.$on('event:auth-loginFailed', function(event, message) {
		$scope.errorMessage = message;
	});
});
