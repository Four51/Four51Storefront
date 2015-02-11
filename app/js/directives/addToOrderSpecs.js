four51.app.directive('addtoorderspecs', ['$routeParams',  function($routeParams) {
	var obj = {
		restrict: 'E',
		templateUrl: 'addToOrderSpecForm.hcf?id=' + $routeParams.productInteropID
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