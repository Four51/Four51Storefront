four51.app.directive('orderhistoryheader', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/reporting/orderHistoryHeaderView.html'
	}
	return obj;
});

four51.app.directive('orderhistoryfooter', function($location, Order, User) {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/reporting/orderHistoryFooterView.html',
        controller: function($scope){
            $scope.repeatOrder = function() {
                $scope.order.Repeat = true;
                Order.save($scope.order, function(data) {
                    $scope.currentOrder = data;
                    $scope.user.CurrentOrderID = data.ID;
                    User.save($scope.user, function(data){
                        $scope.user = data;
                        $location.path('/cart');
                    });
                });
            };
        }
	}
	return obj;
});

four51.app.directive('lineitemhistorygrid', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/reporting/lineItemHistoryGridView.html'
	}
	return obj;
});
