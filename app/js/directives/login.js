four51.app.directive('login', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/controls/login.html',
		controller: 'LoginCtrl'
	}
	return obj;
});