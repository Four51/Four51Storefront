'use strict';

four51.app.controller('UserEditCtrl', function ($scope, User) {
	$scope.loginasuser = {};
	$scope.save = function() {
		$scope.displayLoadingIndicator = true;
        if($scope.user.Type == 'TempCustomer')
			$scope.user.ConvertFromTempUser = true;

		User.save($scope.user, function() {
			$scope.displayLoadingIndicator = false;
			$scope.saveSuccess = true;
		});

    };
	$scope.loginExisting = function(){
		User.login({Username: $scope.loginasuser.Username, Password:  $scope.loginasuser.Password, ID: $scope.user.ID, Type: $scope.user.Type});
	};
});
