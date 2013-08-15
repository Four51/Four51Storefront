
four51.app.controller('CartViewCtrl', function ($scope, $location, $451, OrderService, UserService, OrderConfigService, ProductDisplayService) {
    $scope.user = UserService.get();

	$scope.order = $scope.user.CurrentOrderID != null ? OrderService.get($scope.user.CurrentOrderID, function(data){
		angular.forEach(data.LineItems, function(item){
			ProductDisplayService.setProductViewName(item.Product);
		});
	}) : null;

    $scope.continueShopping = function() {
        $location.path('catalog');
    };

    $scope.cancelOrder = function() {
        $scope.order = OrderService.delete($scope.order, function() {
            UserService.refresh();
        });
    };

    $scope.saveChanges = function() {
        OrderService.save($scope.order);
    };

    $scope.checkOut = function() {
        OrderService.save($scope.order, function() {
            $location.path('checkout');
        });
    };

	$scope.$watch('order.LineItems', function(newval) {
		var newTotal = 0;
        if (!$scope.order) return newTotal;
		angular.forEach($scope.order.LineItems, function(item){
			newTotal += item.LineTotal;
		});
		$scope.order.Subtotal = newTotal;
	}, true);

});