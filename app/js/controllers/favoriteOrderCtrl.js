four51.app.controller('FavoriteOrderCtrl', function FavoriteOrderCtrl($scope, $location, $routeParams, FavoriteOrder, Order) {
    FavoriteOrder.query(function(favs) {
        $scope.favoriteorders = favs;
    });

	$scope.repeat = function(order) {
		order.Repeat = true;
		Order.save(order, function(data) {
			$scope.currentOrder = data;
			$scope.user.CurrentOrderID = data.ID;
			$location.path('/cart');
		});
	};

	$scope.checkAll = function(event) {
		angular.forEach($scope.favoriteorders, function(order) {
			order.Selected = event.currentTarget.checked;
		});
	};
	$scope.deleteSelected = function(event) {
		event.preventDefault();
        FavoriteOrder.delete($scope.favoriteorders, function() {
            FavoriteOrder.query(function(favs) {
                $scope.favoriteorders = favs;
            });
        });
	};
});