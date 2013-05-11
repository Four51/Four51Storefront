four51.app.controller('ErrorCtrl', function ErrorCtrl($scope, $dialog) {
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
		$scope.error = {
			Message: ex.Message || ex.data.MessageDetail || ex.data.Message,
			Detail: ex.ExceptionMessage || ex.data.ExceptionMessage,
			Code: ex.ExceptionType || ex.status || ex.data.ExceptionType,
			StackTrace: ex.StackTrace || ex.data.StackTrace || ex.data.Message
		};
		$scope.open();
	});

	$scope.template = { url: 'partials/error.html'};
});