four51.app.directive('navigation', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/controls/navView.html',
		controller: 'NavCtrl'
	}
	return obj;
});