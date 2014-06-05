four51.app.directive('addtoorderspecs', ['$routeParams',  function($routeParams) {
	var obj = {
		restrict: 'E',
		templateUrl: 'addToOrderSpecForm.hcf?id=' + $routeParams.productInteropID
	}
	return obj;
}]);