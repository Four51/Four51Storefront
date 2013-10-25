four51.app.controller('CheckOutViewCtrl', function ($scope, $location, $filter, $rootScope, $451, User, Order, FavoriteOrder, AddressList) {
    AddressList.query(function(list) {
        $scope.addresses = list;
    });

    $scope.$on('event:shipperChange', function(event,shipper) {
        $scope.currentOrder.Shipper = shipper;
        angular.forEach($scope.currentOrder.LineItems, function(li) {
            li.Shipper = shipper;
            li.ShipperName = shipper.Name;
        });
        Order.save($scope.currentOrder, function(order) {
            $scope.currentOrder = order;
        });
    });

    $scope.$watch('currentOrder.ShipAddressID', function() {
	    if (!$scope.currentOrder) return;
        angular.forEach($scope.currentOrder.LineItems, function(li) {
            li.ShipAddressID = $scope.currentOrder.ShipAddressID;
        });
    });

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

    $scope.showOrder = true;

    //$scope.$on('api:orderGetComplete', init);
});