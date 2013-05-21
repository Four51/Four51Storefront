'use strict';

four51.app.controller('LoginCtrl', function LoginCtrl($scope, $route, LoginService) {
	$scope.$on('event:auth-loginFailed', function(event, message) {
		$scope.errorMessage = message;
	});

	$scope.template = { url: 'partials/login.html'};
});
