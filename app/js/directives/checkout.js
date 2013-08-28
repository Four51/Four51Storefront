four51.app.directive('lineitemgrid', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/controls/lineItemGridView.html',
        controller: 'LineItemGridCtrl'
    };
    return obj;
});

four51.app.directive('shipperselection', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/controls/shipperSelectionView.html',
        controller: function($scope, Shipper) {
            $scope.$on('event:shipAddressUpdate', function() {
                // only update shippers if there are actual rates involved
                //var update = false;
                //angular.forEach($scope.order.Shippers, function(n,i) {
                //    update = update || n.ShippingRate.ShipperType != "Custom";
                //});
                //if (update) {
                    $scope.currentOrder.Shipper = null;
                    Shipper.query(function(shippers) {
                        $scope.Shippers = shippers;
                    });
                //}
            });
            Shipper.query(function(shippers) {
                $scope.Shippers = shippers;
            });
        }
    };
    return obj;
});

