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
}]);