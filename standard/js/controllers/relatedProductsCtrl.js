four51.app.controller('RelatedProductsCtrl', ['$scope', 'Product', '$sce', function($scope, Product, $sce){
	if($scope.relatedgroupid){
		Product.search(null, null, $scope.relatedgroupid, function(products) {
			$scope.relatedProducts = products;
		});
		$scope.trusted = function(d){
			if(d) return $sce.trustAsHtml(d);
		}
	}
}]);