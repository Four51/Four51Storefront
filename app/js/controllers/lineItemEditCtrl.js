four51.app.controller('LineItemEditCtrl', ['$scope', '$routeParams', '$location', 'Product', 'ProductDisplayService', 'Order',
function ($scope, $routeParams, $location, Product, ProductDisplayService, Order) {
	$scope.LineItem = {};
	$scope.LineItem = $scope.currentOrder.LineItems[$routeParams.lineItemIndex];
	Product.get($scope.LineItem.Product.InteropID, function(product){
		$scope.LineItem.Product = product;
		ProductDisplayService.setProductViewScope($scope);
	});
	$scope.allowAddToOrder = true;
	$scope.addToOrderText = "Save Line Item";
	$scope.addToOrder = function(){
		if($scope.lineItemErrors && $scope.lineItemErrors.length){
			$scope.showAddToCartErrors = true;
			return;
		}
		Order.save($scope.currentOrder, function(o){
			$scope.currentOrder = o;
			$location.path('/cart');
		}, function(ex){
			console.log(ex);
		});
	}
}]);