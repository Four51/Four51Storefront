'use strict';

four51.app.controller('LoginCtrl', function LoginCtrl($scope, $route, UserService) {
	$scope.$on('event:auth-loginFailed', function(event, message) {
		$scope.errorMessage = message;
	});

	$scope.login = function() {
		UserService.login(this.user);
	};

	$scope.template = { url: 'partials/login.html'};
});
