four51.app.controller('LoginCtrl', ['$scope', '$sce', '$route', 'User',
function ($scope, $sce, $route, User) {
	var codes = ['PasswordSecurityException'];

	$scope.loginMessage = null;
	$scope.buttonText = "Logon";
	$scope.$on('event:auth-loginFailed', function(event, message) {
		$scope.loginMessage = message;
	});


	$scope.login = function() {
		$scope.loginMessage = null;
		// need to reset any error codes that might be set so we can handle new one's
		angular.forEach(codes, function(c) {
			$scope[c] = null;
		});
		User.login($scope.credentials,
			function(data) {
				if ($scope.credentials.Email) {
					$scope.loginMessage = data.LogonInfoSent;
					$scope.EmailNotFoundException = false;
					$scope.showEmailHelp = false;
					$scope.credentials.Email = null;
					$scope.credentials.Username = null;
					$scope.credentials.Password = null;
				}
			},
			function(ex) {
				$scope.credentials = {};
				$scope[ex.Code.text] = true;
				$scope.loginMessage = ex.Message || "User name and password not found";
				if (ex.Code.is('PasswordSecurity'))
					$scope.loginMessage = $sce.trustAsHtml(ex.Message);
				if (ex.Code.is('EmailNotFoundException') && $scope.credentials.Email)
					$scope.loginMessage = $sce.trustAsHtml(ex.Detail);
				$scope.credentials.Username = null;
				$scope.credentials.Password = null;
				$scope.credentials.CurrentPassword = null;
				$scope.credentials.NewPassword = null;
				$scope.credentials.ConfirmPassword = null;
			}
		);
	};
}]);