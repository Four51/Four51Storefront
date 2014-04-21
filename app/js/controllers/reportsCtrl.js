four51.app.controller('ReportsCtrl', ['$scope', '$location', '$451', 'Report',
function ($scope, $location, $451, Report) {
	Report.query(function(list) {
		$scope.Reports = list;
	});
}]);