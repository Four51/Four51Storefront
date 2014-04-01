four51.app.directive('categorytree', function() {
	var obj = {
		restrict: 'E',
		replace: true,
		scope: {
			tree: '='
		},
		templateUrl: 'partials/categoryTree.html'
	};
	return obj;
});

four51.app.directive('node', ['$compile', function($compile) {
	var obj = {
		restrict: 'E',
		replace: true,
		scope: {
			node: '='
		},
		template: '<li class="451_cat_item"><a ng-href="catalog/{{node.InteropID}}" ng-bind-html="node.Name"></a></li>',
		link: function(scope, element) {
			if (angular.isArray(scope.node.SubCategories)) {
				element.append("<categorytree tree='node.SubCategories' />");
				$compile(element.contents())(scope);
			}
		}
	};
	return obj;
}]);