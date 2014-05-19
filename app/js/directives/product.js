four51.app.directive('productlistview', function() {
    var obj = {
        restrict: "E",
        templateUrl:'partials/productListView.html'
    };

    return obj;
});

four51.app.directive('categorylistview', function() {
    var obj = {
        restrict: "E",
        templateUrl:'partials/categoryList.html'
    };

    return obj;
});

four51.app.directive('shortproductview', function() {
	var obj = {
		restrict: "E",
		scope: {
			p: '=',
            user: '='
		},
		templateUrl:'partials/controls/shortProductView.html',
		controller: 'shortProductViewCtrl'
	};

	return obj;
});

four51.app.directive('shortproductviewinline', function() {
    var obj = {
        restrict: "E",
        scope: {
            p: '=',
            user: '='
        },
        templateUrl:'partials/controls/shortProductViewInline.html',
        controller: 'shortProductViewCtrl'
    };

    return obj;
});

four51.app.directive('shortproductviewminimal', function() {
    var obj = {
        restrict: "E",
        scope: {
            p: '=',
            user: '='
        },
        templateUrl:'partials/controls/shortProductViewMinimal.html',
        controller: 'shortProductViewCtrl'
    };

    return obj;
});

four51.app.directive('shortproductviewgallery', function() {
    var obj = {
        restrict: "E",
        scope: {
            p: '=',
            user: '='
        },
        templateUrl:'partials/controls/shortProductViewGallery.html',
        controller: 'shortProductViewCtrl'
    };

    return obj;
});

four51.app.directive('relatedproducts', function() {
	var obj = {
		scope: {
			relatedgroupid: '='
		},
		restrict: 'E',
		templateUrl: 'partials/relatedProductsView.html',
		controller: 'RelatedProductsCtrl'
	};

	return obj;
});

four51.app.directive('pricescheduletable', function() {
    var obj = {
        scope: {
            ps : '=',
            p : '='
        },
        restrict: 'E',
        templateUrl: 'partials/priceScheduleView.html'
    };

    return obj;
});

four51.app.directive('staticspecstable', function() {
    var obj = {
        scope: {
			specgroups : '=',
	        length: '='
        },
        restrict: 'E',
        templateUrl: 'partials/controls/staticSpecs.html',
		controller: ['$scope', function($scope){
			$scope.hasvisiblechild = function(specs){
				var hasChild = false;
				angular.forEach(specs, function(item){
					if(item.VisibleToCustomer)
						hasChild = true;
				})
				return hasChild;
			}
		}]
    };

    return obj;
});

four51.app.directive('productnav', function() {
	var obj = {
		scope: {
			product: '=',
			variant: '=',
			editvariant: '='
		},
		restrict: 'E',
		templateUrl: 'partials/controls/productNav.html'
	};
	return obj;
});

four51.app.directive("variantlist", function() {
	var obj = {
		restrict: 'E',
		templateUrl:'partials/controls/variantList.html'
	};
	return obj;
});