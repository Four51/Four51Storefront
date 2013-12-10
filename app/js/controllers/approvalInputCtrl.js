four51.app.controller('ApprovalInputCtrl', function ($scope, $rootScope, Order) {
	$scope.approveOrder = function() {
		$scope.loadingIndicator = true;
		$scope.order.Approve = true;
		Order.submit($scope.order,
			function(data) {
				$scope.order = data;
				$scope.loadingIndicator = false;
			},
			function(ex) {
				$scope.loadingIndicator = false;
				$scope.error = ex.Detail;
			}
		);
	}

	$scope.declineOrder = function() {
		$scope.loadingIndicator = true;
		$scope.order.Decline = true;
		Order.submit($scope.order, function(data) {
			$scope.order = data;
			$scope.loadingIndicator = false;
		});
	}
});
