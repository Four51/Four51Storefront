four51.app.controller('OrderViewCtrl', function OrderViewCtrl($scope, $routeParams, OrderService) {
	$scope.order = OrderService.load({ id: $routeParams.id });
	$scope.user = OrderService.user();
});