'use strict';

four51.app.controller('LineItemViewCtrl', function ($scope, $routeParams, OrderService, ProductService) {
    $scope.order = OrderService.get($routeParams.orderid, function(data){

		$scope.LineItem = data.LineItems[$routeParams.lineitemindex];

		//static spec groups are not captured on line item so they require another product.get if we want them shown here.
		//not setting this product to scope to avoid confusion between live product data and line item history data.
		ProductService.get({interopID: $scope.LineItem.Product.InteropID}, function(data){
			$scope.StaticSpecGroups = data.StaticSpecGroups || {};
			//slight hack to get the line item specs to show with the product static spec groups.
			angular.forEach($scope.LineItem.Specs, function(item){
				item.VisibleToCustomer = true;
			})
			$scope.StaticSpecGroups.VariableSpecs = {Name: 'Variable Specs', Specs: $scope.LineItem.Specs};
		});
	});
});
