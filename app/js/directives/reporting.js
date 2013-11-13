four51.app.directive('orderhistorydetails', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/reporting/orderHistoryDetailsView.html'
	}
	return obj;
});

four51.app.directive('orderhistorysummary', function($location, Order, User) {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/reporting/orderHistorySummaryView.html',
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
