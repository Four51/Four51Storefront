'use strict';

$451.app.controller('ListOrdersCtrl', function ($scope, OrderService) {
    console.log("loading list ctrl");

    $scope.orders = OrderService.getAllOrders();
    $scope.encode = function (val) {
        return encodeURIComponent(val);
    };
});