four51.app.directive('lineitemgrid', function() {
    var obj = {
        scope: {
            order: '=',
            user: '='
        },
        restrict: 'E',
        templateUrl: 'partials/controls/lineItemGridView.html',
        transclude: true,
        controller: 'LineItemGridCtrl'
    };
    return obj;
});

four51.app.directive('shipperselection', function() {
    var obj = {
        scope: {
            user: '=',
            order: '='
        },
        restrict: 'E',
        templateUrl: 'partials/controls/shipperSelectionView.html',
        controller: function($scope, ShipperService) {
            $scope.$on('event:shipAddressUpdate', function() {
                // only update shippers if there are actual rates involved
                //var update = false;
                //angular.forEach($scope.order.Shippers, function(n,i) {
                //    update = update || n.ShippingRate.ShipperType != "Custom";
                //});
                //if (update) {
                    $scope.order.Shipper = null;
                    $scope.Shippers = ShipperService.query();
                //}
            });
            $scope.Shippers = ShipperService.query();
        },
        link: function(scope,element,attr) {

        }
    };
    return obj;
});

