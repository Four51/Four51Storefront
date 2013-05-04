'use strict'

/* routing */
$451.app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/listOrders', { templateUrl: 'partials/listOrders.html', controller: 'ListOrdersCtrl' }).
			when('/orderdetails/:orderid', {templateUrl: 'partials/orderDetails.html', controller: 'OrderDetailsCtrl'}).
            when('/catalog', { templateUrl: 'partials/category.html', controller: 'CategoryCtrl' }).
            when('/catalog/:categoryInteropID', { templateUrl: 'partials/category.html', controller: 'CategoryCtrl' }).
            when('/product/:productInteropID', {templateUrl: 'partials/product.html', controller: 'ProductCtrl'}).
            when('/orderstats', { templateUrl: 'partials/orderStats.html', controller: 'OrderStatsCtrl' }).
			when('/login', { templateUrl: 'partials/login.html', controller: 'LoginCtrl' }).
			otherwise({redirectTo: '/category'});
	}]);