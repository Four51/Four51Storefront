four51.app.controller('ProductSearchCtrl', ['$scope', 'Product', '$routeParams', '$location',
function($scope, Product, $routeParams, $location) {
	if($routeParams.searchTerm){
		$scope.searchLoading = true;
		$scope.searchTerm = $routeParams.searchTerm;
		Product.search(null, $scope.searchTerm, null, function(products) {
			$scope.products = products;
			$scope.searchLoading = false;
		});
	}
	$scope.search = function(){
		$location.path('/search/' + $scope.searchTerm);
	}
}]);