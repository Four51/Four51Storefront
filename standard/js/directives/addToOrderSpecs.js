four51.app.directive('addtoorderspecs', ['$routeParams',  function($routeParams) {
	var obj = {
        restrict: 'E',
        template: '<div ng-include="specForm">',
        link: function (scope) {
            scope.specForm = 'addToOrderSpecForm.hcf?id=' + $routeParams.productInteropID + '&r=' + Math.random();
        }
    };
	return obj;
}]);

four51.app.directive('kitaddtoorderspecs', [function() {
	var obj = {
		restrict: 'E',
		template: '<div ng-if="LineItem.Product.IsVBOSS"><figure><img class="product-image-large img-responsive" ng-src="{{LineItem.Variant.LargeImageUrl}}" imageonload /></figure></div><div ng-include="specForm"></div>',
		priority: 500,
		link: function(scope, element, attrs) {
			attrs.$observe('template', function(val) {
				if (val)
					scope.specForm = 'addToOrderSpecForm.hcf?id=' + val;
			});
		}
	};
	return obj;
}]);