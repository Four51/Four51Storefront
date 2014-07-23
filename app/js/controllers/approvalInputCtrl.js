four51.app.controller('ApprovalInputCtrl', ['$scope', '$location', '$rootScope', 'Order', function ($scope, $location, $rootScope, Order) {
	$scope.approveOrder = function() {
		$scope.loadingIndicator = true;
		Order.approve($scope.order,
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
		Order.decline($scope.order,
			function(data) {
				$scope.order = data;
				$scope.loadingIndicator = false;
			},
			function(ex) {
				$scope.loadingIndicator = false;
				$scope.error = "An error occurred while processing.";
			}
		);
	}

	$scope.editOrder = function() {
		$scope.loadingIndicator = true;
		$location.path('cart/' + $scope.order.ID);
	}
}]);