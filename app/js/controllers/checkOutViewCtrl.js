four51.app.controller('CheckOutViewCtrl', function ($scope, $location, $rootScope, $451, User, Order, FavoriteOrder, OrderConfig) {
    /*$scope.order = $scope.user.CurrentOrderID != null ? Order.get($scope.user.CurrentOrderID,
        function(o) {
            // I'm deciding to handle the auto assignment of certain properties here. It's essentially the load of the cart view page
            // it's the first time we'd display information about the order where these auto assigned values
            OrderConfigService.costcenter(o,$scope.user);
        }) : null;
    */

    function init() {
        $scope.orderIsEditable = $scope.currentOrder.Status == 'Unsubmitted' ||
            $scope.currentOrder.Status == 'Open';

        if ($scope.orderIsEditable) {
            $scope.$on('event:shipperChange', function(event,shipper) {
                $scope.currentOrder.Shipper = shipper;
                angular.forEach($scope.currentOrder.LineItems, function(li) {
                    li.Shipper = shipper;
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
                Order.save($scope.currentOrder, function(order) {
                    $scope.currentOrder = order;
                });
            });

            $scope.$on('event:paymentMethodChange', function(event, method) {
                $scope.cart.$setValidity('paymentMethod', method != 'Undetermined');
            });

            $scope.cart.$setValidity('paymentMethod', $scope.currentOrder.PaymentMethod != 'Undetermined');
        }
    }

    function submitOrder() {
        Order.submit($scope.currentOrder, function(data) {
            $scope.currentOrder = data;
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