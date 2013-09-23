four51.app.controller('CheckOutViewCtrl', function ($scope, $location, $filter, $rootScope, $451, User, Order, FavoriteOrder, OrderConfig) {
    /*$scope.order = $scope.user.CurrentOrderID != null ? Order.get($scope.user.CurrentOrderID,
        function(o) {
            // I'm deciding to handle the auto assignment of certain properties here. It's essentially the load of the cart view page
            // it's the first time we'd display information about the order where these auto assigned values
            OrderConfigService.costcenter(o,$scope.user);
        }) : null;
    */
    $scope.orderIsEditable = false;
    function init() {
        $scope.orderIsEditable = $scope.currentOrder != null &&
            ($scope.currentOrder.Status == 'Unsubmitted' || $scope.currentOrder.Status == 'Open');

        if ($scope.orderIsEditable) {
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

            $scope.$on('shipAddressChange', function(event,id) {
                $scope.currentOrder.ShipAddressID = id;
                angular.forEach($scope.currentOrder.LineItems, function(li) {
                    li.ShipAddressID = id;
                });
                Order.save($scope.currentOrder, function(order) {
                    $scope.currentOrder = order;
                });
            });

            $scope.$on('billAddressChange', function(event,id) {
                $scope.currentOrder.BillAddressID = id;
            });

            $scope.$on('event:paymentMethodChange', function(event, method) {
                $scope.cart.$setValidity('paymentMethod', validatePaymentMethod(method));
            });

            $scope.cart.$setValidity('paymentMethod', validatePaymentMethod($scope.currentOrder.PaymentMethod));
        }
    }

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
            //$scope.user.CurrentOrderID = null;
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

    $scope.$on('api:orderGetComplete', init);
});