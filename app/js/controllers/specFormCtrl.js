'use strict';

four51.app.controller('SpecFormCtrl', function ($location,$route, $routeParams, $scope, ProductDisplayService, Variant) {
	var varID = $routeParams.variantInteropID == 'new' ? null :  $routeParams.variantInteropID;

	ProductDisplayService.getProductAndVariant($routeParams.productInteropID, varID, function(data){
		$scope.Product = data.product;
		if(varID)
			$scope.Variant = data.variant;
		else{
			$scope.Variant = {};
			$scope.Variant.ProductInteropID = $scope.Product.InteropID;
			$scope.Variant.Specs = {};
			angular.forEach($scope.Product.Specs, function(item){
				if(!item.CanSetForLineItem)
				{
					$scope.Variant.Specs[item.Name] = item;
				}
			});
		}

	})
	$scope.save = function(){
		Variant.save($scope.Variant, function(data){
			if(!varID)
				$location.path('/product/' + $routeParams.view +'/' + $scope.Product.InteropID + '/'+ data.InteropID + '/edit');
			var d = new Date();
			var n = d.getTime();
			$scope.Variant = data;
			$scope.Variant.PreviewUrl = $scope.Variant.PreviewUrl + "?" + n;
		});
	}
});
