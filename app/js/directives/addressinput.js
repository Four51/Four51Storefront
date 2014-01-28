four51.app.directive('addressinput', function() {
	var obj = {
		restrict: 'E',
		scope: {
			address : '=',
			return: '=',
			user: '='
		},
		templateUrl: 'partials/controls/addressInput.html',
		controller: 'AddressInputCtrl'
	}
	return obj;
});