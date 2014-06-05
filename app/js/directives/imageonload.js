four51.app.directive('imageonload', ['$rootScope', function($rootScope) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('load', function() {
				$rootScope.$broadcast('event:imageLoaded', true);
			});
			element.bind('error', function() {
				$rootScope.$broadcast('event:imageLoaded', false);
			})
		}
	};
}]);