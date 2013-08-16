'use strict';

four51.app.controller('LoginCtrl', function LoginCtrl($scope, $route, $451, UserService) {
	$scope.$on('event:auth-loginFailed', function(event, message) {
		$scope.errorMessage = message;
	});

	$scope.login = function() {
        $451.clear();
		UserService.login(this.user);
	};

	$scope.template = { url: 'partials/login.html'};
});
