four51.app.directive('shortcartview', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/shortCartView.html'
    };
    return obj;
});

four51.app.directive('cartmessage', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/messages/viewCart.html'
	};
	return obj;
});