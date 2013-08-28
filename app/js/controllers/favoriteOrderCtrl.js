four51.app.controller('FavoriteOrderCtrl', function FavoriteOrderCtrl($scope, $routeParams, FavoriteOrder) {
    FavoriteOrder.query(function(favs) {
        $scope.favoriteorders = favs;
    });

	$scope.repeat = function(order) {
		console.log('repeat order: ' + order.ID);
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