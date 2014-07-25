four51.app.controller('shortProductViewCtrl', ['$routeParams', '$scope', 'ProductDisplayService', 'Order', 'User', '$location', '$route', 'AddToOrder', '$rootScope', function ($routeParams, $scope, ProductDisplayService, Order, User, $location, $route, AddToOrder, $rootScope) {
	$scope.LineItem = {};
	$scope.LineItem.Product = $scope.p;
	ProductDisplayService.setNewLineItemScope($scope);
	ProductDisplayService.setProductViewScope($scope);
	$scope.allowAddToOrderInProductList = $scope.allowAddToOrder && $scope.LineItem.Specs.length == 0 && $scope.LineItem.Product.Type != 'VariableText';

    //Add to Order Product List Functionality
    $scope.$on('checkout', function(event){
        AddToOrder.addToOrder($scope.LineItem);
    });
}]);