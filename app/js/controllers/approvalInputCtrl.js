four51.app.controller('ApprovalInputCtrl', ['$scope', '$location', '$rootScope', 'Order', 'Address', function ($scope, $location, $rootScope, Order, Address) {
	$scope.approveOrder = function() {
		$scope.loadingIndicator = true;
		$scope.approveClicked = true;
		Order.approve($scope.order,
			function(data) {
				$scope.order = data;
				if ($scope.order.IsMultipleShip()) {
					angular.forEach(data.LineItems, function(item) {
						if (item.ShipAddressID) {
							Address.get(item.ShipAddressID, function(add) {
								item.ShipAddress = add;
							});
						}
					});
				}
				else {
					Address.get(data.ShipAddressID || data.LineItems[0].ShipAddressID, function(add) {
						data.ShipAddress = add;
					});
				}

				Address.get(data.BillAddressID, function(add){
					data.BillAddress = add;
				});
				$scope.loadingIndicator = false;
			},
			function(ex) {
				$scope.approveClicked = false;
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