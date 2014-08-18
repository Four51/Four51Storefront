four51.app.controller('OrderViewCtrl', ['$scope', '$location', '$routeParams', 'Order', 'FavoriteOrder', 'Address', 'User',
	function ($scope, $location, $routeParams, Order, FavoriteOrder, Address, User) {
		$scope.loadingIndicator = true;


		Order.get($routeParams.id, function(data){
			$scope.loadingIndicator = false;
			$scope.order = data;
			$scope.order.recent = ((Date.parse(data.DateSubmitted) + 300000) - new Date().getTime()) > 0;
			$scope.hasSpecsOnAnyLineItem = false;
			for(var i = 0; i < data.LineItems.length ; i++) {
				if (data.LineItems[i].Specs) {
					$scope.hasSpecsOnAnyLineItem = true;
					break;
				}
			}

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
			if(data.HasShipments){
				Order.listShipments(data, function(data){
					$scope.shipments = data;
				})
			}
		}, true);

		$scope.saveFavorite = function(callback) {
			$scope.displayLoadingIndicator = true;
			$scope.errorMessage = null;
			$scope.actionMessage = null;
			FavoriteOrder.save($scope.order,
				function() {
					$scope.displayLoadingIndicator = false;
					if (callback) callback($scope.order);
					$scope.actionMessage = "Your order has been saved as a Favorite";
				},
				function(ex) {
					$scope.errorMessage = ex.Message;
				}
			);
		};

		$scope.repeatOrder = function() {
			$scope.errorMessage = null;
			$scope.actionMessage = null;
			Order.repeat($scope.order.ID,
				function(data) {
					$scope.currentOrder = data;
					$scope.user.CurrentOrderID = data.ID;
					User.save($scope.user, function(data){
						$scope.user = data;
						$location.path('/cart');
					});
				},
				function(ex) {
					$scope.errorMessage = ex.Message;
				}
			);
		};

		$scope.setCurrent = function() {
			$scope.errorMessage = null;
			$scope.actionMessage = null;
			User.setcurrentorder($scope.order.ID,
				function(data) {
					$scope.user = data;
					Order.get(data.CurrentOrderID, function(order) {
						$scope.currentOrder = order;
						$location.path('/cart');
					});
				},
				function(ex) {
					$scope.errorMessage = ex.Message;
				}
			)
		};

		$scope.onPrint = function()  {
			window.print();
		};
	}]);