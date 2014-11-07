four51.app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	var concatProductView = function(routeParams){
			return 'productview.hcf?id='+ routeParams.productInteropID;
	}

	var concatSpecFormView = function(routeParams){
		return 'specform.hcf?id=' + routeParams.productInteropID;
	}

	$routeProvider.
		when('/listOrders', { templateUrl: 'partials/listOrders.html', controller: 'ListOrdersCtrl' }).
		when('/orderdetails/:orderid', {templateUrl: 'partials/orderDetails.html', controller: 'OrderDetailsCtrl'}).
        when('/catalog', { templateUrl: 'partials/categoryView.html', controller: 'CategoryCtrl' }).
        when('/catalog/:categoryInteropID', { templateUrl: 'partials/categoryView.html', controller: 'CategoryCtrl' }).
        when('/product/:productInteropID', {templateUrl: concatProductView, controller: 'ProductCtrl'}).
        when('/product/:productInteropID/:variantInteropID', {templateUrl: concatProductView, controller: 'ProductCtrl'}).
		when('/product/:productInteropID/:variantInteropID/edit', {templateUrl: concatSpecFormView, controller: 'SpecFormCtrl'}).
		when('/order', { templateUrl: 'partials/orderSearchView.html', controller: 'OrderSearchCtrl' }).
		when('/order/:id', { templateUrl: 'partials/Reporting/orderHistoryView.html', controller: 'OrderViewCtrl' }).
		when('/favoriteorders', { templateUrl: 'partials/favoriteOrderListView.html', controller: 'FavoriteOrderCtrl' }).
		when('/order/:orderid/:lineitemindex/', { templateUrl: 'partials/Reporting/lineItemHistoryView.html', controller: 'LineItemViewCtrl' }).
		when('/message', { templateUrl: 'partials/messageListView.html', controller: 'MessageListCtrl' }).
		when('/message/:id', { templateUrl: 'partials/messageView.html', controller: 'MessageViewCtrl' }).
        when('/admin', { templateUrl: 'partials/userView.html', controller: 'UserEditCtrl' }).
        when('/addresses', { templateUrl: 'partials/addressListView.html', controller: 'AddressListCtrl' }).
        when('/address', { templateUrl: 'partials/addressView.html', controller: 'AddressViewCtrl' }).
        when('/address/:id', { templateUrl: 'partials/addressView.html', controller: 'AddressViewCtrl' }).
        when('/cart', { templateUrl: 'partials/cartView.html', controller: 'CartViewCtrl'}).
        when('/checkout', { templateUrl: 'partials/checkOutView.html', controller: 'CheckOutViewCtrl' }).
		when('/checkout/:id', { templateUrl: 'partials/checkOutView.html', controller: 'CheckOutViewCtrl' }).
		when('/cart/:productInteropID/:lineItemIndex', { templateUrl: concatProductView, controller: 'LineItemEditCtrl'}).
		when('/cart/:id', { templateUrl: 'partials/cartView.html', controller: 'CartViewCtrl' }).
		when('/login', { templateUrl: 'partials/controls/login.html', controller: 'LoginCtrl' }).
		when('/search', { templateUrl: 'partials/searchView.html', controller: 'ProductSearchCtrl' }).
        when('/search/:searchTerm', { templateUrl: 'partials/searchView.html', controller: 'ProductSearchCtrl' }).
        when('/security', { templateUrl: 'partials/Security/security.html', controller: 'SecurityCtrl' }).
        when('/conditions', { templateUrl: 'partials//Conditions/conditions.html', controller: 'ConditionsCtrl' }).
		when('/reports', { templateUrl: 'partials/reportsView.html', controller: 'ReportsCtrl' }).
		when('/report/:id', { templateUrl: 'partials/Reporting/reportView.html', controller: 'ReportCtrl' }).
		when('/contactus/', { templateUrl: 'partials/Messages/contactus.html' }).
		otherwise({redirectTo: '/catalog'});
}]);