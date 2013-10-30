four51.app.controller('CheckOutViewCtrl', function ($scope, $location, $filter, $rootScope, $451, User, Order, FavoriteOrder, AddressList, Shipper) {
	AddressList.query(function(list) {
        $scope.addresses = list;
    });

    $scope.$on('event:shipperChange', function(event,shipper) {
	    if (!hasMultipleAddresses()) {
		    $scope.currentOrder.Shipper = shipper;
		    angular.forEach($scope.currentOrder.LineItems, function(li) {
			    li.Shipper = shipper;
			    li.ShipperName = shipper.Name;
		    });
	    }

        Order.save($scope.currentOrder, function(order) {
            $scope.currentOrder = order;
        });
    });

	function hasMultipleAddresses() {
		var current = $scope.currentOrder.LineItems[0].ShipAddressID;
		var mismatch = false;
		angular.forEach($scope.currentOrder.LineItems, function(li) {
			mismatch = !mismatch || (li.ShipAddressID != current);
			current = li.ShipAddressID;
		});
		return mismatch;
	}

	function getShippers() {
		Shipper.query($scope.currentOrder, function(shippers) {
			if (!hasMultipleAddresses())
				$scope.shippers =  shippers;
			else {
				$scope.shippers = [];
				angular.forEach(shippers, function(s) {
					if (s.ShipperRateType == 'Custom' || s.ShipperRateType == 'None')
						$scope.shippers.push(s);
				})
			}
			var currentShipper = $451.filter($scope.shippers, {'Property': 'Name', 'Value': $scope.currentOrder.LineItems[0].ShipperName || 'none' });
			if (currentShipper.length == 0)
				$scope.currentOrder.LineItems[0].ShipperName = null;
		});
	}

	$scope.setShipAddressAtOrderLevel = function() {
		angular.forEach($scope.currentOrder.LineItems, function(li) {
			li.ShipAddressID = $scope.currentOrder.ShipAddressID;
		});
		getShippers();
	}

	$scope.setShipAddressAtLineItemLevel = function() {
		$scope.currentOrder.ShipAddressID = null;
		getShippers();
	}

	$scope.shipperChange = function(shipper) {
		$scope.currentOrder.LineItems[0].ShipperName = shipper.Name;
	}

	getShippers();

    $scope.$on('event:paymentMethodChange', function(event, method) {
        $scope.cart_billing.$setValidity('paymentMethod', validatePaymentMethod(method));
    });

    function validatePaymentMethod(method) {
        var valid = false;
        switch (method) {
            case 'Undetermined':
                valid = $scope.user.Permissions.contains('SubmitForApproval');
                break;
            case 'PurchaseOrder':
                valid = $scope.user.Permissions.contains('PayByPO');
                break;
            case 'BudgetAccount':
                valid = $scope.user.Permissions.contains('PayByBudgetAccount');
                var account = null;
                angular.forEach($scope.SpendingAccounts, function(a) {
                    if (a.ID == $scope.currentOrder.BudgetAccountID)
                        account = a;
                });
                if (account)
                    valid = (account.AccountType.MaxPercentageOfOrderTotal == 100) && ((account.Balance >= $scope.currentOrder.Total) || account.AccountType.AllowExceed)
                break;
            case 'CreditCard':
                valid = $scope.user.Permissions.contains('PayByCreditCard');
                break;
            default:
                return false;
        }
        return valid;
    }

    function submitOrder() {
        Order.submit($scope.currentOrder, function(data) {
            $scope.currentOrder = data;
            $scope.user.CurrentOrderID = null;
        });
    }

    function saveChanges() {
        Order.save($scope.currentOrder, function(data) {
            $scope.currentOrder = data;
        });
    }

    $scope.continueShopping = function() {
        $location.path('catalog');
    };

    $scope.cancelOrder = function() {
        Order.delete($scope.currentOrder, function() {
            $scope.user.CurrentOrderID = null;
            $scope.currentOrder = null;
        });
    };

    $scope.saveChanges = function() {
        saveChanges();
    }

    $scope.submitOrder = function() {
       submitOrder();
    };

    $scope.saveFavorite = function() {
        FavoriteOrder.save($scope.currentOrder);
    };

    $scope.checkOutSection = 'order';
});