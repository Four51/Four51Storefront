four51.app.directive('login', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/controls/loginView.html',
		controller: 'LoginCtrl'
	}
	return obj;
});