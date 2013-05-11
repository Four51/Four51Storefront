'use strict';

four51.app.controller('LineItemViewCtrl', function ($scope, $routeParams, OrderService) {
    $scope.order = OrderService.load({ id: $routeParams.orderid });
	$scope.lineItemIndex = $routeParams.lineitemid;
});
