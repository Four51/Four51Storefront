'use strict';

four51.app.controller('CategoryCtrl', function ($routeParams,$rootScope, $scope, CategoryService) {
    console.log('load category control');
    $scope.currentCategory = CategoryService.getOne($routeParams.categoryInteropID);
    $scope.categoryInteropID = $routeParams.categoryInteropID;
});