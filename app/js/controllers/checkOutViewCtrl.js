four51.app.controller('CheckOutViewCtrl', function ($scope, $location, $rootScope, $451, User, Order, OrderConfig) {
    /*$scope.order = $scope.user.CurrentOrderID != null ? Order.get($scope.user.CurrentOrderID,
        function(o) {
            // I'm deciding to handle the auto assignment of certain properties here. It's essentially the load of the cart view page
            // it's the first time we'd display information about the order where these auto assigned values
            OrderConfigService.costcenter(o,$scope.user);
        }) : null;
    */

    function saveOrder() {
        Order.save($scope.currentOrder, function(data) {
            $scope.currentOrder = data;
            OrderConfig.costcenter(data, $scope.user);
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
       saveOrder();
    };

    $scope.$watch('currentOrder.Shipper', function(n,o) {
        if (!n || n == o) return;
        saveOrder();
    });

    $scope.$watch('currentOrder.ShipAddressID', function(n,o) {
        if (!n || n == o) return;
        Order.save($scope.currentOrder, function() {
            $rootScope.$broadcast('event:shipAddressUpdate');
        });
    });
});