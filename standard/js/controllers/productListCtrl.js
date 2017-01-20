four51.app.controller('ProductListCtrl', ['$routeParams', '$rootScope', '$scope', 'Product',
function ($routeParams,$rootScope, $scope, Product) {
    $scope.loadSearch = function(){

        if($scope.category && $scope.category.products){
            $scope.Products = $scope.category.products;
            return;
        }

        if($scope.category) {
            Product.search($scope.categoryInteropID, null, null, function(data) {
                $scope.category.products = $scope.Products = data;
	            $scope.productCount = data.Count;
            });
        }
    }
}]);