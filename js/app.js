'use strict';


// Declare app level module which depends on filters, and services
angular.OrdersApp = angular.module('OrdersApp', ['ngResource']).
  config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/listOrders', { templateUrl: 'partials/listOrders.html', controller: 'ListOrdersCtrl' });
	$routeProvider.when('/orderdetails/:orderid', {templateUrl: 'partials/orderDetails.html', controller: 'OrderDetailsCtrl'});
	//$routeProvider.otherwise({redirectTo: '/listOrders'});
  }]);
