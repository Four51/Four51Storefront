four51.app.controller('ReportCtrl', ['$scope', '$routeParams', '$451', 'Report',
function($scope, $routeParams, $451, Report) {
	$scope.displayLoadingIndicator = true;
	Report.get($routeParams.id, function(data) {
		$scope.report = data;
		$scope.displayLoadingIndicator = false;
	});

	$scope.saveReport = function() {
		$scope.displayLoadingIndicator = true;
		$scope.actionMessage = null;
		Report.save($scope.report,
			function(report) {
				$scope.report = report;
				$scope.displayLoadingIndicator = false;
			},
			function(ex) {
				$scope.actionMessage = ex.Message;
				$scope.displayLoadingIndicator = false;
			}
		);
	}
}]);