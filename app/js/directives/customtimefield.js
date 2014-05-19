four51.app.directive('customtimefield', function() {
	var obj = {
		scope: {
			customfield : '='
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
