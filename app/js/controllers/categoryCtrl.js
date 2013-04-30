'use strict';

$451.app.controller('CategoryCtrl', function ($routeParams, $scope, CategoryService, ProductService) {
    console.log("loading category ctrl");
    $scope.categories = CategoryService.get();
    $scope.products = ProductService.get();
    $scope.categoryInteropID = $routeParams.categoryInteropID;
});