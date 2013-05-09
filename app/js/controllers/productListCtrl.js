$451.app.controller('ProductListCtrl', function ($routeParams,$rootScope, $scope, ProductService) {
    console.log('loading ' + $scope.message);
    $scope.loadSearch = function(){
        console.log('call loading');
        $scope.Products = ProductService.search($scope.categoryInteropID, null);
    }
});