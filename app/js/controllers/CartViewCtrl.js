
four51.app.controller('CartViewCtrl', function ($scope, $location, $451, OrderService, UserService, OrderConfigService) {
    $scope.continueShopping = function() {
        $location.path('catalog');
    };

    $scope.cancelOrder = function() {
        $scope.order = OrderService.delete($scope.order, function() {
            UserService.refresh();
        });
    };

    $scope.saveChanges = function() {
        $scope.order = OrderService.save($scope.order);
    };

    $scope.checkOut = function() {
        OrderService.save($scope.order, function() {
            $location.path('checkout');
        });
    };

    $scope.user = UserService.get();
    $scope.order = $scope.user.CurrentOrderID != null ? OrderService.get({ id: $scope.user.CurrentOrderID },
        function(o) {
            // I'm deciding to handle the auto assignment of certain properties here. It's essentially the load of the cart view page
            // it's the first time we'd display information about the order where these auto assigned values
            OrderConfigService.costcenter(o,$scope.user);
        }) : null;

	$scope.$watch('order.LineItems', function(newval) {
		var newTotal = 0;
        if (!$scope.order) return newTotal;
		angular.forEach($scope.order.LineItems, function(item){
			newTotal += item.LineTotal;
		});
		$scope.order.Subtotal = newTotal;
	}, true);

});