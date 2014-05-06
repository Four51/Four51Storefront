four51.app.controller('ReportCtrl', ['$scope', '$routeParams', '$451', 'Report',
function($scope, $routeParams, $451, Report) {
	$scope.displayLoadingIndicator = true;
	$scope.actionMessage = null;
	Report.get($routeParams.id,
		function(data) {
			$scope.report = data;
			$scope.displayLoadingIndicator = false;
		},
		function(ex) {
			$scope.actionMessage = ex.Message;
			$scope.displayLoadingIndicator = false;
		}
	);

	$scope.saveReport = function() {
		$scope.displayLoadingIndicator = true;
		$scope.actionMessage = null;
		Report.save($scope.report,
			function(report) {
				$scope.report = report;
				$scope.actionMessage = "Your changes have been saved.";
				$scope.displayLoadingIndicator = false;
			},
			function(ex) {
				$scope.actionMessage = ex.Message;
				$scope.displayLoadingIndicator = false;
			}
		);
	};
	$scope.downloadReport = function(report) {
		$scope.displayDownloadIndicator = true;
		Report.download(report.ID,
			function(data) {
				$scope.report = data;
			},
			function(ex) {
				$scope.actionMessage = ex.Message;
				$scope.displayDownloadIndicator = false;
			}
		);
	};

	$scope.getDownload = function() {
		window.location = $scope.report.DownloadUrl;
	}
}]);