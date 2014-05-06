four51.app.directive('customcheckboxfield', function() {
	var obj = {
		scope: {
			customfield : '=',
			checked: '@',
			unchecked: '@'
		},
		restrict: 'E',
		templateUrl: 'partials/controls/customCheckBoxField.html',
		controller: function($scope) {
			$scope.setValue = function() {
				$scope.customfield.Value = $scope[$scope.checkValue ? 'checked' : 'unchecked'];
			};

			$scope.$watch('customfield.Value', function(n,o) {
				if (n && !o)
					$scope.checkValue = n == $scope.checked;
			});
		}
	};

	return obj;
});