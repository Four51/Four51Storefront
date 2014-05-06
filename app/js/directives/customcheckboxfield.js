four51.app.directive('customcheckboxfield', function() {
	var obj = {
		scope: {
			customfield : '=',
			checked: '@',
			unchecked: '@'
		},
		restrict: 'E',
		templateUrl: 'partials/controls/customCheckBoxField.html'
	};

	return obj;
});