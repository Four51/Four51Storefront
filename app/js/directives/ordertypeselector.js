four51.app.directive('ordertypeselector', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/controls/orderTypeSelector.html',
		controller: 'OrderTypeSelectorCtrl'
	};
	return obj;
});