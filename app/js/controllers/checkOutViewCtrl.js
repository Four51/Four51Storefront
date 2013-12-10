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
		$scope.shippingUpdatingIndicator = true;
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
				$scope.shippingUpdatingIndicator = false;
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
		}
	};

	$scope.setShipAddressAtOrderLevel = function() {
		$scope.shippingFetchIndicator = true;
		angular.forEach($scope.currentOrder.LineItems, function(li) {
			li.ShipAddressID = $scope.currentOrder.ShipAddressID;
		});
		Order.save($scope.currentOrder, function(order) {
			$scope.currentOrder = order;
			Shipper.query(order, function(list) {
				$scope.shippers = list;
				$scope.shippingFetchIndicator = false;
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
	    if (event == 'BudgetAccount' && ($scope.SpendingAccounts && $scope.SpendingAccounts.length == 1)) {
		    $scope.currentOrder.BudgetAccountID = $scope.SpendingAccounts[0].ID;
	    }
        $scope.cart_billing.$setValidity('paymentMethod', validatePaymentMethod(event));
    });

	$scope.$watch('currentOrder.BudgetAccountID', function() {
		$scope.cart_billing.$setValidity('paymentMethod', validatePaymentMethod('BudgetAccount'));
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
                    if ($scope.currentOrder && a.ID == $scope.currentOrder.BudgetAccountID)
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
		        $scope.cart_billing.$setValidity('paymentMethod', false);
		        $scope.displayLoadingIndicator = false;
	        }
        );
    };

    function saveChanges(callback) {
	    $scope.displayLoadingIndicator = true;
        Order.save($scope.currentOrder, function(data) {
            $scope.currentOrder = data;
	        $scope.displayLoadingIndicator = false;
	        if (callback) callback();
        });
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
	        Order.delete($scope.currentOrder, function() {
	            $scope.user.CurrentOrderID = null;
	            $scope.currentOrder = null;
		        User.save($scope.user, function(data) {
			        $scope.user = data;
			        $scope.displayLoadingIndicator = false;
			        $location.path('catalog');
		        });
	        });
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

	$scope.applyCoupon = function() {
		$scope.couponLoadingIndicator = true;
		$scope.couponError = null;
		Coupon.apply($scope.coupon,
			function(coupon) {
				$scope.currentOrder.Coupon = coupon;
				Order.save($scope.currentOrder, function(data) {
					$scope.currentOrder = data;
					$scope.couponLoadingIndicator = false;
				});
			},
			function(ex) {
				$scope.couponError = ex.Detail;
				$scope.couponLoadingIndicator = false;
			}
		);
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

    $scope.newShippingAddress = function() {
        if ($scope.address) {
            $scope.address = {};
        }
        $scope.addressform = true;
    }
    $scope.cancelShippingAddress = function() {
        $scope.addressform = false;
    }
    $scope.newBillingAddress = function() {
        if ($scope.address) {
            $scope.address = {};
        }
        $scope.addressform = true;
    }
    $scope.cancelBillingAddress = function() {
        $scope.addressform = false;
    }

    $scope.$on('event:AddressSaved', function() {
        AddressList.query(function(list) {
            $scope.addresses = list;
        });
        $scope.addressform = false;
    });

    $scope.checkOutSection = 'order';
});