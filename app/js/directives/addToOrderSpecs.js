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
		template: '<div ng-include="specForm"></div>',
		link: function(scope, element, attrs) {
			//scope.specForm = 'addToOrderSpecForm.hcf?id=' + attrs.template;
			attrs.$observe('template', function(val) {
				scope.specForm = 'addtoOrderSpecForm.hcf?id=' + val;
			});
		}
	};
	return obj;
}]);