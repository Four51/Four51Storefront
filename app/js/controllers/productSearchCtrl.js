four51.app.controller('ProductSearchCtrl', ['$scope', 'Product', '$routeParams',
function($scope, Product, $routeParams) {
	$scope.settings = {
		currentPage: 1,
		pageSize: 40
	};

	$scope.searchTerm = $routeParams.searchTerm;
	$scope.search = Search;

	$scope.$watch('settings.currentPage', function(n, o) {
		if (n != o || (n == 1 && o == 1))
			Search();
	});

	function Search() {
		$scope.searchLoading = true;
		Product.search(null, $scope.searchTerm, null, function(products, count) {
			$scope.products = products;
			$scope.productCount = count;
			$scope.searchLoading = false;
		}, $scope.settings.currentPage, $scope.settings.pageSize);
	}
}]);