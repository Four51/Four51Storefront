four51.app.directive('customtextfield', function() {
    var obj = {
        scope: {
            customfield : '='
        },
        restrict: 'E',
        transclude: true,
        templateUrl: 'partials/controls/customTextField.html',
	    controller: ['$scope', function($scope) {
			if (!$scope.customfield.Value && $scope.customfield.DefaultValue)
				$scope.customfield.Value = $scope.customfield.DefaultValue;
	    }]
    }
    return obj;
});
