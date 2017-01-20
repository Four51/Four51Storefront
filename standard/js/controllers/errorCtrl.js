four51.app.controller('ErrorCtrl', ['$scope', function ($scope) {
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

	$scope.$on('exception', function(event, exception) {
		var ex = exception.data ? exception.data : exception;
		try {
			$scope.error = {
				Message: ex.Message || '',
				Detail: ex.ExceptionMessage || ex.message,
				Code: ex.ExceptionType || '',
				StackTrace: ex.StackTrace || ''
			};
			console.dir($scope.error);
		}
		catch(e) {
			console.log('An error occurred while handling an error. Consult the object written to the log. Keep in mind you must use the Error() if you are throwing an error in your JavaScript');
			console.dir(event);
			console.dir(ex);
		}
	});

	$scope.template = { url: 'partials/errorView.html'};
}]);