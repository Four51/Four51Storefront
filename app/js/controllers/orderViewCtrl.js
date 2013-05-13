four51.app.controller('OrderViewCtrl', function OrderViewCtrl($scope, $routeParams, OrderService) {
	$scope.order = OrderService.get({ id: $routeParams.id });
});