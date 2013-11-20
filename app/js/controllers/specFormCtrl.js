'use strict';

four51.app.controller('SpecFormCtrl', function ($routeParams, $scope, ProductDisplayService, Variant) {
	ProductDisplayService.getProductAndVariant($routeParams.productInteropID, $routeParams.variantInteropID, function(data){
		$scope.Product = data.product;
		$scope.Variant = data.variant;
	})
	$scope.save = function(){
		Variant.save($scope.Variant);
	}
});
