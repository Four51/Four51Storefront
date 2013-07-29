four51.app.controller('FavoriteOrderCtrl', function FavoriteOrderCtrl($scope, $routeParams, FavoriteOrderService) {
	$scope.favoriteorders = FavoriteOrderService.query();

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
		$scope.favoriteorders = FavoriteOrderService.delete($scope.favoriteorders);
	};
});