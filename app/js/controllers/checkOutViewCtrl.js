four51.app.controller('CheckOutViewCtrl', function ($scope, $location, $filter, $rootScope, $451, User, Order, FavoriteOrder, AddressList, Shipper, Coupon, SpendingAccount) {
	AddressList.query(function(list) {
        $scope.addresses = list;
    });

	Shipper.query($scope.currentOrder, function(list) {
		$scope.shippers = list;
	});

	SpendingAccount.query(function(data) {
		$scope.SpendingAccounts = data;
	});

	function hasMultipleAddresses() {
		var multi = false;
		angular.forEach($scope.currentOrder.LineItems, function(li, i) {
			multi = multi || i > 0 ? li.ShipAddressID != $scope.currentOrder.LineItems[i-1].ShipAddressID : false;
		});
		return multi;
	};
	$scope.shipToMultipleAddresses = hasMultipleAddresses();

	$scope.updateShipper = function(li) {
		$scope.shippingLoadingIndicator = true;
		if (!$scope.shipToMultipleAddresses) {
			angular.forEach($scope.shippers, function(s) {
				if (s.Name == $scope.currentOrder.LineItems[0].ShipperName)
					$scope.currentOrder.Shipper = s;
			});
			angular.forEach($scope.currentOrder.LineItems, function(item) {
				item.ShipperName = $scope.currentOrder.Shipper.Name;
				item.ShipperID = $scope.currentOrder.Shipper.ID;
			});
			Order.save($scope.currentOrder, function(order) {
				$scope.currentOrder = order;
				$scope.shippingLoadingIndicator = false;
			});
		}
		else {
			angular.forEach($scope.shippers, function(s) {
				if (s.ID == li.ShipperName)
					li.Shipper = s;
			});
			li.ShipperName = li.Shipper.Name;
			li.ShipperID = li.Shipper.ID;
			$scope.shippingLoadingIndicator = false;
		}
	};

	$scope.setShipAddressAtOrderLevel = function() {
		angular.forEach($scope.currentOrder.LineItems, function(li) {
			li.ShipAddressID = $scope.currentOrder.ShipAddressID;
		});
		Order.save($scope.currentOrder, function(order) {
			$scope.currentOrder = order;
			Shipper.query(order, function(list) {
				$scope.shippers = list;
			});
		});
	};

	$scope.setShipAddressAtLineItem = function() {
		$scope.currentOrder.ShipAddressID = $scope.currentOrder.LineItems[0].ShipAddressID;
		$scope.currentOrder.Shipper = $scope.currentOrder.LineItems[0].Shipper;
		Order.save($scope.currentOrder, function(order) {
			$scope.currentOrder = order;
			Shipper.query(order, function(list) {
				$scope.shippers = list;
			});
		});
	};

    $scope.$watch('currentOrder.PaymentMethod', function(event, method) {
	    if (event == 'BudgetAccount' && $scope.SpendingAccounts.length == 1) {
		    $scope.currentOrder.BudgetAccountID = $scope.SpendingAccounts[0].ID;
	    }
        $scope.cart_billing.$setValidity('paymentMethod', validatePaymentMethod(event));
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
	    $scope.displayLoadingIndicator = true;
        Order.submit($scope.currentOrder, function(data) {
			$scope.user.CurrentOrderID = null;
			User.save($scope.user, function(data) {
		        $scope.user = data;
                $scope.displayLoadingIndicator = false;
	        });
	        $scope.currentOrder = null;
	        $location.path('/order/' + data.ID);
        });
    };

    function saveChanges() {
	    $scope.displayLoadingIndicator = true;
        Order.save($scope.currentOrder, function(data) {
            $scope.currentOrder = data;
	        $scope.displayLoadingIndicator = false;
        });
    };

    $scope.continueShopping = function() {
        $location.path('catalog');
    };

    $scope.cancelOrder = function() {
	    $scope.displayLoadingIndicator = true;
        Order.delete($scope.currentOrder, function() {
            $scope.user.CurrentOrderID = null;
            $scope.currentOrder = null;
	        User.save($scope.user, function(data) {
		        $scope.user = data;
		        $scope.displayLoadingIndicator = false;
	        });
        });
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

	$scope.applyCoupon = function() {
		$scope.couponLoadingIndicator = true;
		$scope.couponError = null;
		Coupon.apply($scope.coupon, function(coupon) {
			$scope.currentOrder.Coupon = coupon;
			Order.save($scope.currentOrder, function(data) {
				$scope.currentOrder = data;
				$scope.couponLoadingIndicator = false;
			});
		});
	};

	$scope.removeCoupon = function() {
		$scope.couponError = null;
		$scope.couponLoadingIndicator = true;
		Coupon.remove(function() {
			Order.save($scope.currentOrder, function(data) {
				$scope.currentOrder = data;
				$scope.couponLoadingIndicator = false;
			});
		});
	};

    $scope.checkOutSection = 'order';
});