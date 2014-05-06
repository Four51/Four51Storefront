four51.app.directive('customdatefield', function() {
	var obj = {
		scope: {
			customfield : '='
		},
		restrict: 'E',
		templateUrl: 'partials/controls/customDateField.html'
	};

	return obj;
});
