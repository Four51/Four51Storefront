'use strict';

$451.app.controller('OrderStatsCtrl', function OrderStatsCtrl($scope, $cookies, $http, $dialog, OrderStatsService) {
    $scope.orderstats = OrderStatsService.query();
    $scope.standardorders = 'Standard Orders';
});