four51.app.controller('CheckOutViewCtrl', function ($scope, $location, $filter, $rootScope, $451, User, Order, FavoriteOrder, AddressList, Shipper, Coupon) {
	AddressList.query(function(list) {
        $scope.addresses = list;
    });

	Shipper.query($scope.currentOrder, function(list) {
		$scope.shippers = list;
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
		var id = li ? li.ShipperID : $scope.currentOrder.ShipperID;
		var shipper = $451.filter($scope.shippers, { Property: 'ID', Value: id })[0];
		if (!$scope.shipToMultipleAddresses) {
			$scope.currentOrder.Shipper = shipper;
			angular.forEach($scope.currentOrder.LineItems, function(li) {
				li.ShipperID = id;
				li.Shipper = shipper;
				li.ShipperName = shipper.Name;
			});
			Order.save($scope.currentOrder, function(order) {
				$scope.currentOrder = order;
			});
		}
		else {
			li.Shipper = shipper;
			li.ShipperName = shipper.Name;
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
        Order.submit($scope.currentOrder, function(data) {
            $scope.currentOrder = data;
            $scope.user.CurrentOrderID = null;
	        User.save($scope.user, function(data) {
		        $scope.user = data;
                $scope.displayLoadingIndicator = true;
	        });
            $location.path('/order/' + data.ID);
        });
    };

    function saveChanges() {
        Order.save($scope.currentOrder, function(data) {
            $scope.currentOrder = data;
        });
    };

    $scope.continueShopping = function() {
        $location.path('catalog');
    };

    $scope.cancelOrder = function() {
        Order.delete($scope.currentOrder, function() {
            $scope.user.CurrentOrderID = null;
            $scope.currentOrder = null;
	        User.save($scope.user, function(data) {
		        $scope.user = data;
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
		$scope.couponError = null;
		Coupon.apply($scope.coupon, function(coupon) {
			$scope.currentOrder.Coupon = coupon;
			Order.save($scope.currentOrder, function(data) {
				$scope.currentOrder = data;
			});
		});
	};

	$scope.removeCoupon = function() {
		$scope.couponError = null;
		Coupon.remove(function() {
			Order.save($scope.currentOrder, function(data) {
				$scope.currentOrder = data;
			});
		});
	};

    $scope.checkOutSection = 'order';
});