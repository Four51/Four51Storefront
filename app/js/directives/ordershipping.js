four51.app.directive('ordershipping', function(Order, Shipper, Address) {
	var obj = {
		restrict: 'AE',
		templateUrl: 'partials/controls/orderShipping.html',
		controller: function($scope) {
			var shipToMultipleAddresses = function(order) {
				if (!order || !$scope.user.Permissions.contains('ShipToMultipleAddresses')) return false;
				var multi = false;
				angular.forEach(order.LineItems, function(li, i) {
					multi = multi || i > 0 ? (li.ShipAddressID != order.LineItems[i-1].ShipAddressID || (li.ShipFirstName != order.LineItems[i-1].ShipFirstName || order.LineItems[i-1].ShipLastName != order.ShipLastName)) : false;
				});
				return multi;
			};

			var saveChanges = function(callback) {
				Order.save($scope.currentOrder,
					function(data) {
						$scope.currentOrder = data;
						$scope.displayLoadingIndicator = false;
						if (callback) callback($scope.currentOrder);
					},
					function(ex) {
						$scope.actionMessage = ex.Message;
						$scope.shippingUpdatingIndicator = false;
						$scope.shippingFetchIndicator = false;
					}
				);
			};

			Shipper.query($scope.currentOrder, function(list) {
				$scope.shippers = list;
			});

			$scope.shipToMultipleAddresses = shipToMultipleAddresses($scope.currentOrder);

			$scope.setSingleShipAddress = function() {
				$scope.shipToMultipleAddresses = false;
				angular.forEach($scope.currentOrder.LineItems, function(li) {
					li.ShipFirstName = null;
					li.ShipLastName = null;
				});
			};

			$scope.$watch('currentOrder.ShipAddressID', function(newValue) {
				$scope.orderShipAddress = {};
				if ($scope.currentOrder) {
					$scope.currentOrder.ShipFirstName = null;
					$scope.currentOrder.ShipLastName = null;
					angular.forEach($scope.currentOrder.LineItems, function(item) {
						item.ShipFirstName = null;
						item.ShipLastName = null;
					});
				}

				if (newValue) {
					Address.get(newValue, function(add) {
						if ($scope.user.Permissions.contains('EditShipToName') && !add.IsCustEditable) {
							angular.forEach($scope.currentOrder.LineItems, function(item) {
								item.ShipFirstName = add.FirstName;
								item.ShipLastName = add.LastName;
							});
						}
						$scope.orderShipAddress = add;
					});
				}
			});

			$scope.setShipAddressAtLineItem = function(item) {
				item.ShipperName = null;
				item.Shipper = null;
				item.ShipperID = null;
				$scope.currentOrder.ShipAddressID = $scope.currentOrder.LineItems[0].ShipAddressID;
				$scope.currentOrder.ShipFirstName = null;
				$scope.currentOrder.ShipLastName = null;
				$scope.currentOrder.Shipper = $scope.currentOrder.LineItems[0].Shipper;
				saveChanges(function(order) {
					Shipper.query(order, function(list) {
						$scope.shippers = list;
					});
				});
			};

			$scope.setShipAddressAtOrderLevel = function() {
				$scope.shippingFetchIndicator = true;
				$scope.currentOrder.ShipperName = null;
				$scope.currentOrder.Shipper = null;
				$scope.currentOrder.ShipperID = null;
				$scope.currentOrder.LineItems[0].ShipperName = null;
				$scope.currentOrder.LineItems[0].Shipper = null;
				$scope.currentOrder.LineItems[0].ShipperID = null;
				angular.forEach($scope.currentOrder.LineItems, function(li) {
					li.ShipAddressID = $scope.currentOrder.ShipAddressID;
					li.ShipFirstName = null;
					li.ShipLastName = null;
				});
				saveChanges(function(order) {
					Shipper.query(order, function(list) {
						$scope.shippers = list;
						$scope.shippingFetchIndicator = false;
					});
				});
			};
			$scope.updateShipper = function(li) {
				$scope.shippingUpdatingIndicator = true;
				$scope.shippingFetchIndicator = true;
				if (!li) {
					angular.forEach($scope.shippers, function(s) {
						if (s.Name == $scope.currentOrder.LineItems[0].ShipperName)
							$scope.currentOrder.Shipper = s;
					});

					angular.forEach($scope.currentOrder.LineItems, function(item) {
						item.ShipperName = $scope.currentOrder.Shipper ? $scope.currentOrder.Shipper.Name : null;
						item.ShipperID = $scope.currentOrder.Shipper ? $scope.currentOrder.Shipper.ID : null;
					});

					saveChanges(function() {
						$scope.shippingUpdatingIndicator = false;
						$scope.shippingFetchIndicator = false;
					});
				}
				else {
					angular.forEach($scope.shippers, function(s) {
						if (s.Name == li.ShipperName)
							li.Shipper = s;
					});
					li.ShipperName = li.Shipper.Name;
					li.ShipperID = li.Shipper.ID;
					$scope.shippingUpdatingIndicator = false;
					$scope.shippingFetchIndicator = false;
				}
			};

			$scope.$on('event:orderUpdate', $scope.updateShipper());

			$scope.$on('event:AddressCancel', function(event) {
				$scope.addressform = false;
			});
			$scope.$on('event:AddressSaved', function(event, address) {
				if (address.IsShipping) {
					$scope.currentOrder.ShipAddressID = address.ID;
					if (!$scope.shipToMultipleAddresses)
						$scope.setShipAddressAtOrderLevel();
				}
				if (address.IsBilling) {
					$scope.currentOrder.BillAddressID = address.ID;
				}
				AddressList.query(function(list) {
					$scope.addresses = list;
				});
				$scope.addressform = false;
				$scope.shipaddress = { Country: 'US', IsShipping: true, IsBilling: false };
				$scope.billaddress = { Country: 'US', IsShipping: false, IsBilling: true };
			});
		}
	};
	return obj;
})