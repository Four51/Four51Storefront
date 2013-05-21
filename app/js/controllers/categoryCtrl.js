'use strict';

four51.app.controller('CategoryCtrl', function ($routeParams, $scope, $451, CategoryService) {
    $scope.currentCategory = CategoryService.getOne($routeParams.categoryInteropID);
    $scope.categoryInteropID = $routeParams.categoryInteropID;
	$scope.$on("$routeChangeSuccess", function() {
		$scope.tree = CategoryService.tree();
	});
});