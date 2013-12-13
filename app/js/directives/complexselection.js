four51.app.directive('complexselection', function() {
	var obj = {
		restrict: 'E',
		scope: {
			address : '=',
			return: '=',
			user: '='
		},
		templateUrl: 'partials/controls/complexSelection.html',
		controller: 'ComplexSelectionCtrl'
	}
	return obj;
});
