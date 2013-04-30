'use strict';

$451.app.controller('CategoryCtrl', function ($routeParams, $scope, CategoryService) {
    console.log("loading category ctrl");
    $scope.categories = CategoryService.get();

    $scope.categoryInteropID = $routeParams.categoryInteropID;
});