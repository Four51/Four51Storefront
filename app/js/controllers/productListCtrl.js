four51.app.controller('ProductListCtrl', function ($routeParams,$rootScope, $scope, ProductService) {
    $scope.loadSearch = function(){

        if($scope.category && $scope.category.products){
            $scope.Products = $scope.category.products;
            console.log('returing cached category products')
            return;
        }

        if($scope.category)
            $scope.category.products = $scope.Products = ProductService.search($scope.categoryInteropID, null);


    }
});