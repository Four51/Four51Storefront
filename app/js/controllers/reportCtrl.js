four51.app.controller('ReportCtrl', ['$scope', '$routeParams', '$451', 'Report',
function($scope, $routeParams, $451, Report) {
	Report.get($routeParams.id, function(data) {
		$scope.report = data;
	});

	$scope.saveReport = function() {
		Report.save($scope.report,
			function(report) {
				$scope.report = report;
			},
			function(ex) {
				$scope.error = ex.Message;
			}
		);
	}
}]);