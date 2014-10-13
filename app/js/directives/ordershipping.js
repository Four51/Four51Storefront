four51.app.directive('ordershipping', ['Order', 'Shipper', 'Address', 'AddressList', function(Order, Shipper, Address, AddressList) {
	var obj = {
		restrict: 'AE',
		templateUrl: 'partials/controls/orderShipping.html',
		controller: ['$scope', function($scope) {
			AddressList.clear();
			AddressList.shipping(function(list) {
				$scope.shipaddresses = list;
				if ($scope.isEditforApproval) {
					if (!AddressList.contains($scope.currentOrder.ShipAddress))
						$scope.shipaddresses.push($scope.currentOrder.ShipAddress);
				}
			});
			$scope.shipaddress = { Country: 'US', IsShipping: true, IsBilling: false };
			$scope.$on('event:AddressCancel', function() {
				$scope.shipaddressform = false;
			});
			$scope.$on('event:AddressSaved', function(event, address) {
				if (address.IsShipping) {
					$scope.currentOrder.ShipAddressID = address.ID;
					if (!$scope.shipToMultipleAddresses)
						$scope.setShipAddressAtOrderLevel();
					$scope.shipaddressform = false;
				}

				AddressList.shipping(function(list) {
					$scope.shipaddresses = list;
					if ($scope.isEditforApproval) {
						$scope.shipaddresses.push($scope.currentOrder.ShipAddress);
						$scope.shipaddresses.push($scope.currentOrder.BillAddress);
					}
				});
				$scope.shipaddress = { Country: 'US', IsShipping: true, IsBilling: false };
			});

			var saveChanges = function(callback, error) {
				$scope.errorMessage = null;
				var auto = $scope.currentOrder.autoID;
				Order.save($scope.currentOrder,
					function(data) {
						$scope.currentOrder = data;
						$scope.displayLoadingIndicator = false;
						if (auto) {
							$scope.currentOrder.autoID = true;
							$scope.currentOrder.ExternalID = 'auto';
						}
						if (callback) callback($scope.currentOrder);
					},
					function(ex) {
						if (auto)
							$scope.currentOrder.ExternalID = auto;
						$scope.errorMessage = ex.Message;
						$scope.shippingUpdatingIndicator = false;
						$scope.shippingFetchIndicator = false;
						if (error) error(ex);
					}
				);
			};

			Shipper.query($scope.currentOrder, function(list) {
				$scope.shippers = list;
				// sometimes the current shipper is not longer available. we need to clear the shipping information in that case
				var exists = false;
				angular.forEach(list, function(s) {
					if (!exists && $scope.currentOrder.LineItems[0].ShipperID == s.ID)
						exists = true;
				});
				if (!exists) {
					Order.clearshipping($scope.currentOrder);
				}
			});

			$scope.setMultipleShipAddress = function() {
				$scope.currentOrder.forceMultipleShip(true);
				angular.forEach($scope.currentOrder.LineItems, function(li, i) {
					if (i == 0) return;
					li.ShipAddressID = null;
					li.ShipFirstName = null;
					li.ShipLastName = null;
					li.ShipperID = null;
					li.ShipperName = null;
					li.ShipAccount = null;
				});
			}

			$scope.setSingleShipAddress = function() {
				$scope.currentOrder.forceMultipleShip(false);
				angular.forEach($scope.currentOrder.LineItems, function(li) {
					li.ShipAddressID = $scope.currentOrder.LineItems[0].ShipAddressID;
					li.ShipFirstName = $scope.currentOrder.LineItems[0].ShipFirstName;
					li.ShipLastName = $scope.currentOrder.LineItems[0].ShipLastName;
					li.ShipperID = $scope.currentOrder.LineItems[0].ShipperID;
					li.ShipAccount = $scope.currentOrder.LineItems[0].ShipAccount;
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
				item.ShipFirstName = null;
				item.ShipLastName = null;
				saveChanges(
					function(order) {
						Shipper.query(order,
							function(list) {
								$scope.shippers = list;
							}
						);
					},
					function(ex) {
						item.ShipAddressID = null;
					}
				);
			};

			$scope.setShipAddressAtOrderLevel = function() {
				$scope.shippingFetchIndicator = true;
				$scope.currentOrder.ShipperName = null;
				$scope.currentOrder.Shipper = null;
				$scope.currentOrder.ShipperID = null;
				angular.forEach($scope.currentOrder.LineItems, function(li) {
					li.ShipAddressID = $scope.currentOrder.ShipAddressID;
					li.ShipFirstName = null;
					li.ShipLastName = null;
					li.ShipperName = null;
					li.Shipper = null;
					li.ShipperID = null;
				});
				saveChanges(
					function(order) {
						Shipper.query(order, function(list) {
							$scope.shippers = list;
								$scope.shippingFetchIndicator = false;
							}
						);
					},
					function(ex) {
						$scope.currentOrder.ShipAddressID = null;
						angular.forEach($scope.currentOrder.LineItems, function(li) {
							li.ShipAddressID = null;
						});
					}
				);
			};
			$scope.updateShipper = function(li) {
				$scope.shippingUpdatingIndicator = true;
				$scope.shippingFetchIndicator = true;
				if (!li) { // at the order level
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
				else { // at the lineitem level for multiple shipping
					angular.forEach($scope.shippers, function(s) {
						if (s.Name == li.ShipperName)
							li.Shipper = s;
					});
					li.ShipperName = li.Shipper.Name;
					li.ShipperID = li.Shipper.ID;
					saveChanges(function() {
						$scope.shippingUpdatingIndicator = false;
						$scope.shippingFetchIndicator = false;
					});
				}
			};

			$scope.$on('event:AddressCancel', function(event) {
				$scope.addressform = false;
			});
		}]
	};
	return obj;
}]);

four51.app.directive('shippingmessage', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/messages/shipping.html'
	};
	return obj;
});