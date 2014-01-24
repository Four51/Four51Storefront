'use strict';

four51.app.controller('UserEditCtrl', function ($scope, $location, $sce, User) {
	$scope.loginasuser = {};
	$scope.actionMessage = null;

	if($scope.user.Type != 'TempCustomer')
		$scope.user.TempUsername = $scope.user.Username

	$scope.save = function() {
		$scope.actionMessage = null;
		$scope.user.Username = $scope.user.TempUsername;
		$scope.displayLoadingIndicator = true;
        if($scope.user.Type == 'TempCustomer')
			$scope.user.ConvertFromTempUser = true;

		User.save($scope.user,
			function(u) {
				$scope.securityWarning = false;
				$scope.displayLoadingIndicator = false;
				$scope.actionMessage = 'Your changes have been saved';
				$scope.user.TempUsername = u.Username;
			},
			function(ex) {
				$scope.displayLoadingIndicator = false;
				$scope.actionMessage = $sce.trustAsHtml(ex.Message);
				if (ex.Code.is('PasswordSecurityException')) {
					$scope.securityWarning = true;
					//$scope.actionMessage = null;
				}
			}
		);
    };
	$scope.loginExisting = function(){
		User.login({Username: $scope.loginasuser.Username, Password:  $scope.loginasuser.Password, ID: $scope.user.ID, Type: $scope.user.Type},function(u){
			$location.path("/catalog");
		});
	};
});
