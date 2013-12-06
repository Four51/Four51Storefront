'use strict';

four51.app.controller('CategoryCtrl', function ($routeParams, $scope, $451, Category, Product) {
	$scope.productLoadingIndicator = true;
	Product.search($routeParams.categoryInteropID, null, function(products) {
        $scope.products = products;
		$scope.productLoadingIndicator = false;
    });
    if ($routeParams.categoryInteropID) {
	    $scope.categoryLoadingIndicator = true;
        Category.get($routeParams.categoryInteropID, function(cat) {
            $scope.currentCategory = cat;
	        $scope.categoryLoadingIndicator = false;
        });
    }else{
		$scope.currentCategory ={SubCategories:$scope.tree};
	}



    // No tooltips on phone, tablet portrait
    if (!window.matchMedia || (window.matchMedia("(min-width: 1023px)").matches)) {
        $('.fa').tooltip();
    }

});