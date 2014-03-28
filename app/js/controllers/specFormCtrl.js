four51.app.controller('SpecFormCtrl', ['$scope', '$location', '$route', '$routeParams', 'ProductDisplayService', 'Variant',
function ($scope, $location, $route, $routeParams, ProductDisplayService, Variant) {
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
	});

	$scope.save = function(){
		Variant.save($scope.Variant, function(data){
			$location.path('/product/' + $scope.Product.InteropID + '/'+ data.InteropID);
		});
	}
}]);