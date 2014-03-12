four51.app.controller('CheckOutViewCtrl', function ($scope, $location, $filter, $rootScope, $451, User, Order, OrderConfig, FavoriteOrder, AddressList) {
	if (!$scope.currentOrder) {
        $location.path('catalog');
    }

    AddressList.query(function(list) {
        $scope.addresses = list;
    });

	var showOrderConfig = function() {
		return ($scope.user.Permissions.contains('EditPOID') ||
			$scope.user.Permissions.contains('Comments') ||
			($scope.user.Permissions.contains('CostCenterPerOrder') && !$scope.user.Permissions.contains('CostCenterPerLine')) ||
			$scope.currentOrder.OrderFields.length > 0);
	}
	$scope.hasOrderConfig = showOrderConfig();
	$scope.shipaddress = { Country: 'US', IsShipping: true, IsBilling: false };
	$scope.billaddress = { Country: 'US', IsShipping: false, IsBilling: true };

	$scope.$on('event:AddressSaved', function(event, address) {
		if (address.IsShipping) {
			$scope.currentOrder.ShipAddressID = address.ID;
			if (!$scope.shipToMultipleAddresses)
				$scope.setShipAddressAtOrderLevel();
			$scope.addressform = false;
		}
		if (address.IsBilling) {
			$scope.currentOrder.BillAddressID = address.ID;
			$scope.billaddressform = false;
		}
		AddressList.query(function(list) {
			$scope.addresses = list;
		});
		$scope.shipaddress = { Country: 'US', IsShipping: true, IsBilling: false };
		$scope.billaddress = { Country: 'US', IsShipping: false, IsBilling: true };
	});

    function submitOrder() {
	    $scope.displayLoadingIndicator = true;
	    $scope.errorMessage = null;
        Order.submit($scope.currentOrder,
	        function(data) {
				$scope.user.CurrentOrderID = null;
				User.save($scope.user, function(data) {
			        $scope.user = data;
	                $scope.displayLoadingIndicator = false;
		        });
		        $scope.currentOrder = null;
		        $location.path('/order/' + data.ID);
	        },
	        function(ex) {
		        $scope.errorMessage = ex.Message;
		        $scope.displayLoadingIndicator = false;
		        $scope.shippingUpdatingIndicator = false;
		        $scope.shippingFetchIndicator = false;
	        }
        );
    };

    function saveChanges(callback) {
	    $scope.displayLoadingIndicator = true;
	    $scope.errorMessage = null;
	    $scope.actionMessage = null;
	    var auto = $scope.currentOrder.autoID;
        Order.save($scope.currentOrder,
	        function(data) {
		        $scope.currentOrder = data;
		        OrderConfig.costcenter($scope.currentOrder, $scope.user).address($scope.currentOrder, $scope.user);
		        if (auto) {
			        $scope.currentOrder.autoID = true;
			        $scope.currentOrder.ExternalID = 'auto';
		        }
		        $scope.displayLoadingIndicator = false;
		        if (callback) callback($scope.currentOrder);
	            $scope.actionMessage = "Your changes have been saved";
	        },
	        function(ex) {
		        $scope.currentOrder.ExternalID = null;
		        $scope.errorMessage = ex.Message;
		        $scope.displayLoadingIndicator = false;
		        $scope.shippingUpdatingIndicator = false;
		        $scope.shippingFetchIndicator = false;
	        }
        );
    };

    $scope.continueShopping = function() {
	    if (confirm('Do you want to save changes to your order before continuing?') == true)
	        saveChanges(function() { $location.path('catalog') });
        else
		    $location.path('catalog');
    };

    $scope.cancelOrder = function() {
	    if (confirm('Are you sure you wish to cancel your order?') == true) {
		    $scope.displayLoadingIndicator = true;
	        Order.delete($scope.currentOrder,
		        function() {
		            $scope.user.CurrentOrderID = null;
		            $scope.currentOrder = null;
			        User.save($scope.user, function(data) {
				        $scope.user = data;
				        $scope.displayLoadingIndicator = false;
				        $location.path('catalog');
			        });
		        },
		        function(ex) {
			        $scope.actionMessage = ex.Message;
			        $scope.displayLoadingIndicator = false;
		        }
	        );
	    }
    };

    $scope.saveChanges = function() {
        saveChanges();
    };

    $scope.submitOrder = function() {
       submitOrder();
    };

    $scope.saveFavorite = function() {
        FavoriteOrder.save($scope.currentOrder);
    };

    $scope.checkOutSection = showOrderConfig() ? 'order' : 'shipping';
});