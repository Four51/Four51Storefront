'use strict';

four51.app.controller('ConditionsCtrl', function ConditionsCtrl($scope, $location, User) {
	$scope.accept = function() {
		$scope.user.AcceptConditions = true;
		User.save($scope.user, function() {
			$location.path('catalog');
		});
	}
});