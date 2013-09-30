four51.app.controller('ApprovalInputCtrl', function ($scope, $rootScope, Order) {
	$scope.approveOrder = function() {
		$scope.order.Approve = true;
		Order.submit($scope.order, function(data) {
			$scope.order = data;
		});
	}

	$scope.declineOrder = function() {
		$scope.order.Decline = true;
		Order.submit($scope.order, function(data) {
			$scope.order = data;
		});
	}
});
