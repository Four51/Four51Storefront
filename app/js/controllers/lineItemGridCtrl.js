'use strict';

four51.app.controller('LineItemGridCtrl', function ($scope) {
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
});
