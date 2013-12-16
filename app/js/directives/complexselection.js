four51.app.directive('complexselection', function($parse, $compile, $http, $templateCache) {
	var loader;

	var obj = {
		restrict: 'E',
		scope: {
			model: '=ngModel',
			change: '&',
			list: '='
		},
		controller: function($scope) {
			$scope.selectItem = function(item) {
				//$scope.$apply(function() {
					$scope.model = item;
					if ($scope.change) $scope.change();
				//});
			};
		},
		compile: function(tElement, tAttrs) {
			loader = $http.get('partials/controls/' + tAttrs.template + '.html', { cache: $templateCache })
				.success(function(html) {
					tElement.html(html);
				});

			return function(scope, element, attrs) {
				loader.then(function(text) {
					element.html($compile(tElement.html())(scope));
				});
			}
		}
	}
	return obj;
});
