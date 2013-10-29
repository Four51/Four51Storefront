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
	getShippers();

    $scope.$on('event:paymentMethodChange', function(event, method) {
        $scope.cart.$setValidity('paymentMethod', validatePaymentMethod(method));
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
                var account;
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

	function orderShipsToMultiple() {
		if (!$scope.user.Permissions.contains('ShipToMultipleAddresses')) return false;
		if ($scope.currentOrder.LineItems.length < 2) return false;
		angular.forEach($scope.currentOrder.LineItems, function(li) {

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

    //step through checkout sections
    //http://onehungrymind.com/ng-animate-first-look-with-angularjs-wizard/
    $scope.steps = ['one', 'two', 'three'];
    $scope.step = 0;

    $scope.isCurrentStep = function(step) {
        return $scope.step === step;
    };

    $scope.setCurrentStep = function(step) {
        $scope.step = step;
    };

    $scope.getCurrentStep = function() {
        return $scope.steps[$scope.step];
    };
    $scope.isFirstStep = function() {
        return $scope.step === 0;
    };

    $scope.isLastStep = function() {
        return $scope.step === ($scope.steps.length - 1);
    };

    $scope.getNextLabel = function() {
        return ($scope.isLastStep()) ? '' : 'Next';
    };

    $scope.handlePrevious = function() {
        $scope.step -= ($scope.isFirstStep()) ? 0 : 1;
    };

    $scope.handleNext = function(dismiss) {
        if($scope.isLastStep()) {
            dismiss();
        } else {
            $scope.step += 1;

        }
    };


    //$scope.$on('api:orderGetComplete', init);
});