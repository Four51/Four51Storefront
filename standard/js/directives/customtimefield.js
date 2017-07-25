four51.app.directive('customtimefield', function() {
	var obj = {
		scope: {
			customfield : '=',
            hidesuffix: '@',
            hideprefix: '@'
		},
		restrict: 'E',
		templateUrl: 'partials/controls/customTimeField.html',
		controller: ['$scope', function($scope){
			$scope.$watch('customfield', function(c) {
				if (c && c.Value == "")
					c.Value = new Date().toISOString();
			});
		}]
	};

	return obj;
});
