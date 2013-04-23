'use strict';

var $451 = {};

$451.app = angular.module('OrdersApp', ['ngResource', 'ui.bootstrap']);

$451.app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/listOrders', { templateUrl: 'partials/listOrders.html', controller: 'ListOrdersCtrl' });
	$routeProvider.when('/orderdetails/:orderid', {templateUrl: 'partials/orderDetails.html', controller: 'OrderDetailsCtrl'});
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
	//$routeProvider.otherwise({redirectTo: '/listOrders'});
  }]);
