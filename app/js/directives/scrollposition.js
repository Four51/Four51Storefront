//TODO: doesn't appear to be used
// http://stackoverflow.com/questions/13549216/changing-css-on-scrolling-angular-style
four51.app.directive('scrollposition', function($window) {
	return function(scope, element, attrs) {
		var windowEl = angular.element($window);
		windowEl.on('scroll', function() {
			scope.$apply(function() {
				scope[attrs.scrollposition] = windowEl.scrollTop();
			});
		});
	};
});