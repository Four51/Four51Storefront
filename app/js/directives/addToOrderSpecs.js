four51.app.directive('addtoorderspecs', function($routeParams) {
	var obj = {
		restrict: 'E',
		templateUrl: 'addToOrderSpecForm.hcf?id=' + $routeParams.productInteropID
	}
	return obj;
});