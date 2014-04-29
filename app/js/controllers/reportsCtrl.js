four51.app.controller('ReportsCtrl', ['$scope', '$location', '$451', 'Report',
function ($scope, $location, $451, Report) {
	$scope.displayLoadingIndicator = true;
	Report.query(function(list) {
		$scope.Reports = list;
		$scope.displayLoadingIndicator = false;
	});

	$scope.deleteSelected = function(event) {
		$scope.displayLoadingIndicator = true;
		$scope.actionMessage = null;
		Report.delete($scope.Reports,
			function() {
				Report.query(function(list) {
					$scope.Reports = list;
					$scope.displayLoadingIndicator = false;
				});
			},
			function(ex) {
				$scope.actionMessage = ex.Message;
				$scope.displayLoadingIndicator = false;
			}
		);
	};

	$scope.queueReport = function(report) {
		$scope.displayDownloadIndicator = true;
		Report.download(report.ID,
			function(data) {
				report = data;
			},
			function(ex) {
				$scope.actionMessage = ex.Message;
				$scope.displayDownloadIndicator = false;
			}
		);
	}

	$scope.downloadReport = function(report) {
		console.log('Downloading: ' + report.DownloadUrl);
		window.location = "https://core.four51.com/UI/Report.csv";
	}
}]);