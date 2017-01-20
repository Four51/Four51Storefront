four51.app.directive('customdatefield', function() {
	var obj = {
		scope: {
			customfield : '=',
            hidesuffix: '@',
            hideprefix: '@'
		},
		restrict: 'E',
		templateUrl: 'partials/controls/customDateField.html'
	};

	return obj;
});
