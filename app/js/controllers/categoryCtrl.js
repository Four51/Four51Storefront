'use strict';

four51.app.controller('CategoryCtrl', function ($routeParams, $scope, $451, Category, Product) {
	Product.search($routeParams.categoryInteropID, null, function(products) {
        $scope.products = products;
    });
    if ($routeParams.categoryInteropID) {
        Category.get($routeParams.categoryInteropID, function(cat) {
            $scope.currentCategory = cat;
        });
    }


    // No tooltips on mobile
    if (!window.matchMedia || (window.matchMedia("(min-width: 767px)").matches)) {
        $('.fa').tooltip();
    }

});