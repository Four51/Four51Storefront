four51.app.controller('ReportViewController', ['$scope', function($scope) {
	$scope.open = function(cal, event) {
		event.preventDefault();
		event.stopPropagation();
		$scope[cal] = true;
	};
}]);
