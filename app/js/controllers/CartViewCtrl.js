
four51.app.controller('CartViewCtrl', function ($scope, $location, $451, OrderService, UserService) {
    $scope.continueShopping = function() {
        $location.path('catalog');
    };

    $scope.cancelOrder = function() {
        OrderService.delete($scope.order, function() {
            $scope.order = null;
            UserService.refresh();
        });
    };

    $scope.saveChanges = function() {
        OrderService.save($scope.order, function(data) {
            $scope.order = data;
        });
    };

    $scope.checkOut = function() {
        OrderService.save($scope.order);
        $location.path('checkout');
    };

    $scope.user = UserService.get();
    $scope.order = $scope.user.CurrentOrderID != null ? OrderService.get({ id: $scope.user.CurrentOrderID }) : null;

	$scope.$watch('order.LineItems', function(newval){
		var newTotal = 0;
        if (!$scope.order) return newTotal;
		angular.forEach($scope.order.LineItems, function(item){
			newTotal += item.LineTotal;
		});
		$scope.order.Subtotal = newTotal;
	}, true);
});