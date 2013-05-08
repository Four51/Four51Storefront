'use strict';

$451.app.controller('CategoryCtrl', function ($routeParams,$rootScope, $scope, CategoryService, ProductService) {
    console.log("loading category ctrl");
    $scope.currentCategory = CategoryService.getOne($routeParams.categoryInteropID);
    $rootScope.$broadcast("event:CurrentCategoryChanged", $scope.currentCategory);
});