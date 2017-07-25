four51.app.controller('ConditionsCtrl', ['$scope', '$location', 'User',
function ($scope, $location, User) {
	$scope.accept = function() {
		$scope.user.AcceptConditions = true;
		User.save($scope.user, function() {
			$location.path('catalog');
		});
	}
}]);