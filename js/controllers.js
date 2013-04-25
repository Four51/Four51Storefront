'use strict';

/* Controllers */


$451.app.controller('ListOrdersCtrl', function ($scope, OrderService) {
	console.log("loading list ctrl");

	$scope.orders = OrderService.getAllOrders();
	$scope.encode = function (val) {
		return encodeURIComponent(val);
	};	
});
$451.app.controller('CategoryCtrl', function ($scope) {
    console.log("loading category ctrl");
    $scope.hello = 'fu';
});
$451.app.controller('Login', function LoginCtrl($scope, $http, Login) {
	$scope.Login = function() {
		Login.save($scope.user, function(response) {
			//console.dir(response);
		});
	};
});

$451.app.controller('OrderDetailsCtrl', function ($scope, $routeParams, OrderService) {
	console.log("loading details ctrl");
	$scope.order = OrderService.getOneOrder($routeParams.orderid);
	$scope.editItem = false;
	$scope.saveCurrentOrder = function () {
		OrderService.save($scope.order);
	};
	$scope.startNewOrder = function () {

		$scope.order = OrderService.startNewOrder();

	};
	$scope.addLineItem = function () {
		//var existingShipping = $scope.order.LineItems[$scope.order.LineItems.length - 1].ShippingAddress;

		$scope.order.LineItems.push({  });
	}
	$scope.removeLineItem = function (index) {
		$scope.order.LineItems.splice(index, 1);
		OrderService.save($scope.order);
	}
});

$451.app.controller('OrderStats', function OrderStatsCtrl($scope, $cookies, $http, $dialog, OrderStats) {
	$scope.orderstats = OrderStats.query();
	$scope.standardorders = 'Standard Orders';
	$scope.openDialog = function(item) {
		var d = $dialog.dialog({ modalFade: false }).open('partials/modal.html', 'Modal');
	};
});

