'use strict'

/* routing */
myapp.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/listOrders', { templateUrl: 'partials/listOrders.html', controller: 'ListOrdersCtrl' }).
			when('/orderdetails/:orderid', {templateUrl: 'partials/orderDetails.html', controller: 'OrderDetailsCtrl'}).
			when('/orderstats', { templateUrl: 'partials/orderStats.html', controller: 'OrderStats' }).
			when('/orders', { templateUrl: 'partials/orders.html', controller: 'OrderStats' }).
			when('/login', { templateUrl: 'partials/login.html', controller: 'Login' }).
			otherwise({redirectTo: '/listOrders'});
	}]);