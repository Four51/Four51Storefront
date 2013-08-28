'use strict';

four51.app.controller('LoginCtrl', function LoginCtrl($scope, $route, $451, User) {
	$scope.$on('event:auth-loginFailed', function(event, message) {
		$scope.errorMessage = message;
	});

	$scope.login = function() {
        $451.clear();
		User.login(this.credentials);
	};

	$scope.template = { url: 'partials/login.html'};
});
