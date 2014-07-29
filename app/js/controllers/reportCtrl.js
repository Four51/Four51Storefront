four51.app.controller('ReportCtrl', ['$scope', '$routeParams', '$451', 'Report',
function($scope, $routeParams, $451, Report) {
	$scope.displayLoadingIndicator = true;
	$scope.actionMessage = null;
	$scope.errorMessage = null;
	$scope.settings = {
		currentPage: 1,
		pageSize: 10
	};

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
		$scope.errorMessage = null;
		$scope.displayLoadingIndicator = true;
		$scope.actionMessage = null;
		Report.save($scope.report,
			function(report) {
				$scope.report = report;
				$scope.actionMessage = "Your changes have been saved.";
				$scope.displayLoadingIndicator = false;
			},
			function(ex) {
				$scope.errorMessage = ex.Message;
				$scope.displayLoadingIndicator = false;
			}
		);
	};
	$scope.downloadReport = function(report) {
		$scope.errorMessage = null;
		$scope.actionMessage = null;
		$scope.displayLoadingIndicator = true;
		Report.download(report.ID,
			function(data) {
				$scope.report = data;
				$scope.settings.listCount = data.Data.length;
				$scope.displayLoadingIndicator = false;
			},
			function(ex) {
				$scope.errorMessage = ex.Message;
				$scope.displayLoadingIndicator = false;
			}
		);
	};

	$scope.getDownload = function() {
		window.location = $scope.report.DownloadUrl;
	}
}]);