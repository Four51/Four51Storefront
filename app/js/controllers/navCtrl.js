'use strict';

four51.app.controller('NavCtrl', function ($location, $scope, $451, User) {
    $scope.Logout = function(){
        User.logout();
        $location.path("/catalog");
    };

	$scope.refreshUser = function() {
		User.refresh(function(user) {
			$scope.currentUser = user;
		});
	}
});