four51.app.controller('ReportsCtrl', ['$scope', '$location', '$451', 'SavedReports',
function ($scope, $location, $451, SavedReports) {
	SavedReports.query(function(list) {
		$scope.Reports = list;
	});

	$scope.GetReport = function(event, id) {
		event.preventDefault();
		SavedReports.get(id, function(data) {
			$scope.report = data;
		});
	}
}]);