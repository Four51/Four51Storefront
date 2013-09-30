four51.app.directive('navigation', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/controls/nav.html',
		controller: 'NavCtrl'
	}
	return obj;
});