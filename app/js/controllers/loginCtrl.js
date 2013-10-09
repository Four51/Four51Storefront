'use strict';

four51.app.controller('LoginCtrl', function LoginCtrl($scope, $route, User) {

	$scope.$on('event:auth-loginFailed', function(event, message) {
		$scope.errorMessage = message;
	});

	$scope.login = function() {
		User.login(this.credentials);
	};
});
