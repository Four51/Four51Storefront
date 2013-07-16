'use strict';

four51.app.controller('CategoryCtrl', function ($routeParams, $scope, $451, CategoryService, ProductService) {
    $scope.currentCategory = CategoryService.getOne($routeParams.categoryInteropID);
    $scope.categoryInteropID = $routeParams.categoryInteropID;
	$scope.lineItems = [];

	$scope.products = ProductService.search($scope.categoryInteropID, null);

});