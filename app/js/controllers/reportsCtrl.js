four51.app.controller('ReportsCtrl', ['$scope', '$location', '$451', 'Report',
function ($scope, $location, $451, Report) {
	Report.query(function(list) {
		$scope.Reports = list;
	});

	$scope.GetReport = function(event, id) {
		event.preventDefault();
		Report.get(id, function(data) {
			$scope.report = data;
		});
	}
}]);