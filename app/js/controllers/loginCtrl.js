'use strict';

four51.app.controller('LoginCtrl', function LoginCtrl($scope, $sce, $route, User) {

	$scope.buttonText = "Logon";
	$scope.$on('event:auth-loginFailed', function(event, message) {
		$scope.actionMessage = message;
	});

	var codes = ['PasswordSecurityException'];

	$scope.login = function() {
		$scope.actionMessage = null;
		// need to reset any error codes that might be set so we can handle new one's
		angular.forEach(codes, function(c) {
			$scope[c] = null;
		});
		User.login($scope.credentials,
			function(data) {
				if ($scope.credentials.Email) {
					$scope.actionMessage = data.LogonInfoSent;
					$scope.EmailNotFoundException = false;
					$scope.showEmailHelp = false;
					$scope.credentials.Email = null;
				}

			},
			function(ex) {
				$scope[ex.Code.text] = true;
				if (ex.Code.is('PasswordSecurity'))
					$scope.actionMessage = $sce.trustAsHtml(ex.Message);
				if (ex.Code.is('EmailNotFoundException') && $scope.credentials.Email)
					$scope.actionMessage = $sce.trustAsHtml(ex.Detail);
				$scope.credentials.Password = null;
				$scope.credentials.CurrentPassword = null;
				$scope.credentials.NewPassword = null;
				$scope.credentials.ConfirmPassword = null;
			}
		);
	};
});
