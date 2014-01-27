four51.app.controller('CheckOutViewCtrl', function ($scope, $location, $filter, $rootScope, $451, User, Order, FavoriteOrder, AddressList, Shipper, Coupon, SpendingAccount, Address) {
	if (!$scope.currentOrder) {
        $location.path('catalog');
    }

    AddressList.query(function(list) {
        $scope.addresses = list;
    });

	Shipper.query($scope.currentOrder, function(list) {
		$scope.shippers = list;
	});

	SpendingAccount.query(function(data) {
		$scope.SpendingAccounts = data;
	});

	var shipToMultipleAddresses = function(order) {
		if (!order) return false;
		var multi = false;
		angular.forEach(order.LineItems, function(li, i) {
			multi = multi || i > 0 ? (li.ShipAddressID != order.LineItems[i-1].ShipAddressID || (li.ShipFirstName != order.LineItems[i-1].ShipFirstName || li.LineItems[i-1].ShipLastName != order.ShipLastName)) : false;
		});
		return multi;
	};

	$scope.shipToMultipleAddresses = shipToMultipleAddresses($scope.currentOrder);

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

	$scope.setSingleShipAddress = function() {
		$scope.shipToMultipleAddresses = false;
		angular.forEach($scope.currentOrder.LineItems, function(li) {
			li.ShipFirstName = null;
			li.ShipLastName = null;
		});
	}

	$scope.$on('event:orderUpdate', $scope.updateShipper());

    $scope.$watch('currentOrder.ShipAddressID', function(newValue) {
	    $scope.orderShipAddress = {};
	    $scope.currentOrder.ShipFirstName = null;
	    $scope.currentOrder.ShipLastName = null;
	    angular.forEach($scope.currentOrder.LineItems, function(item) {
		    item.ShipFirstName = null;
		    item.ShipLastName = null;
	    });
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

    $scope.$watch('currentOrder.BillAddressID', function(newValue) {
        if (newValue) {
            Address.get(newValue, function(add) {
	            if ($scope.user.Permissions.contains('EditBillToName') && !add.IsCustEditable) {
	                $scope.currentOrder.BillFirstName = add.FirstName;
	                $scope.currentOrder.BillLastName = add.LastName;
                }
                $scope.BillAddress = add;
            });
        }
    });

    $scope.$watch('currentOrder.PaymentMethod', function(event) {
	    if (event == 'BudgetAccount' && ($scope.SpendingAccounts && $scope.SpendingAccounts.length == 1)) {
		    $scope.currentOrder.BudgetAccountID = $scope.SpendingAccounts[0].ID;
	    }
	    else {
		    if (!$scope.isSplitBilling) {
		        $scope.currentOrder.BudgetAccountID = null;
			    $scope.currentOrder.currentBudgetAccount = null;
	        }
	    }
        $scope.cart_billing.$setValidity('paymentMethod', validatePaymentMethod(event));
    });

	var budgetAccountCalculation = function(value) {
		if (value) {
			var valid = validatePaymentMethod('BudgetAccount');
			angular.forEach($scope.SpendingAccounts, function(a) {
				if (a.ID == value) {
					$scope.currentBudgetAccount = a;
				}
			});
			var discount = $scope.currentBudgetAccount.AccountType.MaxPercentageOfOrderTotal != 100 ?
				$scope.currentOrder.Total * ($scope.currentBudgetAccount.AccountType.MaxPercentageOfOrderTotal *.01) :
				$scope.currentBudgetAccount.Balance;
			$scope.remainingOrderTotal = $scope.currentOrder.Total - discount;
			$scope.cart_billing.$setValidity('paymentMethod', valid);
		}
	}

	$scope.$watch('currentOrder.Total', function(total) {
		if ($scope.currentOrder.BudgetAccountID)
			budgetAccountCalculation($scope.currentOrder.BudgetAccountID);
	});

	$scope.$watch('currentOrder.BudgetAccountID', function(value) {
		$scope.currentBudgetAccount = null;
		budgetAccountCalculation(value);
	});

    function validatePaymentMethod(method) {
	    var validateAccount = function() {
		    var account = null;
		    angular.forEach($scope.SpendingAccounts, function(a) {
			    if ($scope.currentOrder && a.ID == $scope.currentOrder.BudgetAccountID)
				    account = a;
		    });
		    if (account) {
			    $scope.isSplitBilling = false;
			    if (account.AccountType.MaxPercentageOfOrderTotal != 100) {
			        $scope.isSplitBilling = true;
				    return false;
			    }

			    if (account.Balance <= $scope.currentOrder.Total) {
				    $scope.isSplitBilling = !account.AccountType.AllowExceed;
				    return account.AccountType.AllowExceed;
			    }
			    else
			        return true;
		    }
		    return false;
	    }

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
                valid = valid ? validateAccount() : valid;
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
		        $scope.actionMessage = ex.Message;
		        $scope.displayLoadingIndicator = false;
	        }
        );
    };

    function saveChanges(callback) {
	    $scope.displayLoadingIndicator = true;
        $scope.showSave = true;
	    var auto = $scope.currentOrder.autoID;
        Order.save($scope.currentOrder,
	        function(data) {
	            $scope.currentOrder = data;
		        if (auto) {
			        $scope.currentOrder.autoID = true;
			        $scope.currentOrder.ExternalID = 'auto';
		        }
		        $scope.displayLoadingIndicator = false;
		        if (callback) callback($scope.currentOrder);
	            $scope.actionMessage = 'Your changes have been saved.';
                $scope.showSave = false;
	        },
	        function(ex) {
		        if (ex.Code.is('ObjectExistsException')) { // unique id
			        ex.Message = ex.Message.replace('{0}', 'Order ID (' + $scope.currentOrder.ExternalID + ')');
		        }
		        $scope.actionMessage = ex.Message;
		        $scope.displayLoadingIndicator = false;
                $scope.showSave = false;
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

	$scope.applyCoupon = function() {
		$scope.couponLoadingIndicator = true;
		$scope.couponError = null;
		Coupon.apply($scope.currentOrder.CouponCode,
			function(coupon) {
				$scope.currentOrder.Coupon = coupon;
				saveChanges(function() {
					$scope.couponLoadingIndicator = false;
				});
			},
			function(ex) {
				$scope.couponError = ex.Message;
				$scope.couponLoadingIndicator = false;
			}
		);
	};

	$scope.removeCoupon = function() {
		$scope.couponError = null;
		$scope.couponRemoveIndicator = true;
		Coupon.remove(function() {
			saveChanges(function() {
				$scope.couponRemoveIndicator = false;
			});
		});
	};

	$scope.shipaddress = { Country: 'US', IsShipping: true, IsBilling: false };
	$scope.billaddress = { Country: 'US', IsShipping: false, IsBilling: true };

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

    $scope.checkOutSection = 'order';
});