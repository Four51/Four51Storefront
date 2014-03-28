four51.app.controller('ReportCtrl', ['$scope', '$routeParams', '$451', 'SavedReports',
function($scope, $routeParams, $451, SavedReports) {
	SavedReports.get($routeParams.id, function(data) {
		$scope.report = data;
	});
}]);