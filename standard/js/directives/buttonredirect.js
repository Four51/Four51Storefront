four51.app.directive('redirect', ['$location', function($location) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			attrs.$observe('redirect', function() {
				element.on('click', function() {
					scope.$apply(function() {
						$location.path(attrs.redirect);
					});
				});
			});
		}
	};
}]);