
four51.app.controller('CartViewCtrl', function ($scope, $location, $451, Order, OrderConfig, ProductDisplayService) {
	//$scope.order = OrderService.get($scope.user.CurrentOrderID, function(data){
		//angular.forEach($scope.currentOrder.LineItems, function(item){
		//	ProductDisplayService.setProductViewName(item.Product);
		//});
	//});

    $scope.continueShopping = function() {
        $location.path('catalog');
    };

    $scope.cancelOrder = function() {
        Order.delete(function() {
            $scope.user.CurrentOrderID = null;
            $scope.currentOrder = null;
        });
    };

    $scope.saveChanges = function() {
        Order.save($scope.currentOrder, function(data) {
            $scope.currentOrder = data;
            OrderConfig.costcenter(data, $scope.user);
        });
    };

    $scope.checkOut = function() {
        Order.save($scope.currentOrder, function(data) {
            $scope.currentOrder = data;
            $location.path('checkout');
        });
    };

	$scope.$watch('currentOrder.LineItems', function(newval) {
		var newTotal = 0;
        if (!$scope.currentOrder) return newTotal;
		angular.forEach($scope.currentOrder.LineItems, function(item){
			newTotal += item.LineTotal;
		});
		$scope.currentOrder.Subtotal = newTotal;
	}, true);

});