'use strict';

four51.app.controller('LineItemViewCtrl', function ($scope, $routeParams, OrderService, ProductService) {
    $scope.order = OrderService.get({ id: $routeParams.orderid }, function(data){
		$scope.LineItem = data.LineItems[$routeParams.lineitemindex]; // $scope.lineItemIndex = $routeParams.lineitemindex;

		//static spec groups are not captured on line item so they require another product.get if we want them shown here.
		//not setting this product to scope to avoid confusion between live product data and line item history data.
		ProductService.get({interopID: $scope.LineItem.Product.InteropID}, function(data){
			$scope.StaticSpecGroups = data.StaticSpecGroups;
		});
	});

});
