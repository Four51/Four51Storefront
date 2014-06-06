four51.app.directive('copyright', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/copyrightView.html',
	    controller: ['$scope', function($scope) {
			var d = new Date();
		    $scope.year = d.getFullYear();
	    }]
    }
    return obj;
});