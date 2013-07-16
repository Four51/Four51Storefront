'use strict';

four51.app.controller('LineItemGridCtrl', function ($scope, OrderService, UserService) {
    var hasSpecs = false;
    $scope.copyAddressToAll = function(order) {
        angular.forEach(order.LineItems, function(n,i) {
            n.DateNeeded = order.LineItems[0].DateNeeded;
        });
    };
    $scope.hasSpecsOnAnyLineItem = function(order) {
        if (hasSpecs) return true;
        angular.forEach(order.LineItems, function(item) {
            if (item.Specs) {
                hasSpecs = true;
            }
        });
        return hasSpecs;
    };
    $scope.removeSelected = function(order) {
        OrderService.save(order, function(data) {
            order = data;
            UserService.refresh();
        });
    }
});
