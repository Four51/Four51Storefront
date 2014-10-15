four51.app.controller('LineItemEditCtrl', ['$scope', '$routeParams', '$location', 'Product', 'ProductDisplayService', 'Order',
function ($scope, $routeParams, $location, Product, ProductDisplayService, Order) {

	function init() {
		$scope.LineItem = {};
		$scope.LineItem = $scope.currentOrder.LineItems[$routeParams.lineItemIndex];
		Product.get($scope.LineItem.Product.InteropID, function (product) {
			$scope.LineItem.Product = product;
			ProductDisplayService.setProductViewScope($scope);
		});
	}

	var isEditforApproval = $routeParams.orderID != null && $scope.user.Permissions.contains('EditApprovalOrder');
	if (isEditforApproval) {
		$scope.LineItemIndex = $routeParams.lineItemIndex;
		Order.get($routeParams.orderID, function(order) {
			$scope.currentOrder = order;
			init();
		});
	}
	else
		init();

	$scope.allowAddToOrder = true;
	$scope.addToOrderText = "Save Line Item";
	$scope.addToOrder = function(){
		if($scope.lineItemErrors && $scope.lineItemErrors.length){
			$scope.showAddToCartErrors = true;
			return;
		}
		Order.save($scope.currentOrder, function(o){
			$scope.currentOrder = o;
			$location.path('/cart' + (isEditforApproval ? '/' + o.ID : ''));
		}, function(ex){
			console.log(ex);
		});
	}
}]);