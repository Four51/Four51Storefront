'use strict';

four51.app.controller('UserEditCtrl', function ($scope, $location, User) {
	$scope.loginasuser = {};

	if($scope.user.Type != 'TempCustomer')
		$scope.user.TempUsername = $scope.user.Username

	$scope.save = function() {
		$scope.user.Username = $scope.user.TempUsername;
		$scope.displayLoadingIndicator = true;
        if($scope.user.Type == 'TempCustomer')
			$scope.user.ConvertFromTempUser = true;

		User.save($scope.user,
			function(u) {
				$scope.securityWarning = false;
				$scope.displayLoadingIndicator = false;
				$scope.saveSuccess = 'Your changes have been saved';
				$scope.user.TempUsername = u.Username;
			},
			function(ex) {
				$scope.displayLoadingIndicator = false;
				$scope.actionMessage = ex.Detail;
				if (ex.Code.is('PasswordSecurityException'))
					$scope.securityWarning = true;
			}
		);
    };
	$scope.loginExisting = function(){
		User.login({Username: $scope.loginasuser.Username, Password:  $scope.loginasuser.Password, ID: $scope.user.ID, Type: $scope.user.Type},function(u){
			$location.path("/catalog");
		});
	};
});
