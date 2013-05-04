$451.app.controller('ErrorCtrl', function ErrorCtrl($scope, $dialog) {
	$scope.open = function() {
		$scope.isError = true;
	};
	$scope.close = function() {
		$scope.isError = false;
	};
	$scope.opts = {
		backdropFade: true,
		dialogFade: true
	};

	$scope.$on('event:raise-Error', function(scope, ex) {
		$scope.error = ex;
		$scope.open();
	});
});