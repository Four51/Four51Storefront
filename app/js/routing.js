'use strict'

/* routing */
$451.app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/listOrders', { templateUrl: 'partials/listOrders.html', controller: 'ListOrdersCtrl' }).
			when('/orderdetails/:orderid', {templateUrl: 'partials/orderDetails.html', controller: 'OrderDetailsCtrl'}).
            when('/catalog', { templateUrl: 'partials/category.html', controller: 'CategoryCtrl' }).
            when('/catalog/:categoryInteropID', { templateUrl: 'partials/category.html', controller: 'CategoryCtrl' }).
            when('/product/:productInteropID', {templateUrl: 'partials/product.html', controller: 'ProductCtrl'}).
            when('/order', { templateUrl: 'partials/orderSearch.html', controller: 'OrderSearchCtrl' }).
			when('/order/:id', { templateUrl: 'partials/orderView.html', controller: 'OrderViewCtrl' }).
			when('/login', { templateUrl: 'partials/login.html', controller: 'LoginCtrl' }).
			otherwise({redirectTo: '/catalog'});
	}]);