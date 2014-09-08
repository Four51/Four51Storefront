four51.app.directive('neworder', function() {
	var obj = {
		restrict: 'A',
		//template: '<button ng-if="user.Permissions.contains(\'MultipleShoppingCart\') && currentOrder" class="btn btn-default" ng-click="startNewOrder()"><small>{{"Start" | r | xlat}} {{"New" | r | xlat}} {{"Order" | r | xlat}}</small></button>',
		controller: ['$scope', '$location', 'User', function($scope, $location, User) {
			$scope.startNewOrder = function() {
				User.startneworder($scope.user,
					function(user) {
						$scope.user = user;
						$location.path('/catalog');
					},
					function(ex) {
						$scope.actionMessage = ex.Message;
					}
				);
			};
		}]
	};
	return obj;
});
