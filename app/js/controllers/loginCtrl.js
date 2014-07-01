four51.app.controller('LoginCtrl', ['$scope', '$sce', '$route', '$location', 'User',
function ($scope, $sce, $route, $location, User) {
	$scope.PasswordReset = $location.search().token != null;
	var codes = ['PasswordSecurityException'];

	$scope.loginMessage = null;
	$scope.buttonText = $scope.PasswordReset ? 'Reset Password' : "Logon";
	$scope.$on('event:auth-loginFailed', function(event, message) {
		$scope.loginMessage = message;
	});

	// build a post method for password reset
	$scope.login = function() {
		$scope.loginMessage = null;
		// need to reset any error codes that might be set so we can handle new one's
		angular.forEach(codes, function(c) {
			$scope[c] = null;
		});
		$scope.credentials.PasswordResetToken = $location.search().token;
		$scope.PasswordReset ? _reset() : _login();
	};

	var _reset = function() {
		User.reset($scope.credentials,
			function(user) {
				delete $scope.PasswordReset;
				delete $scope.credentials;
				$location.path('catalog');
			},
			function(ex) {
				$scope.loginMessage = $sce.trustAsHtml(ex.Message);
			}
		);
	}

	var _login = function() {
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
	}
}]);