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
            $scope.allowShipperInput = function() {
                return $scope.user.ShipMethod.ShipperSelectionType == 'UserDropDown' || $scope.user.ShipMethod.ShipperSelectionType == 'UserOpenField';
            };
            $scope.$on('event:shipAddressUpdate', function() {
                // only update shippers if there are actual rates involved
                var update = false;
                angular.forEach($scope.order.Shippers, function(n,i) {
                    update = update || n.ShippingRate.ShipperType != "Custom";
                });
                if (update) {
                    $scope.order.Shipper = null;
                    $scope.order.Shippers = ShipperService.query();
                }
            });

            $scope.order.Shippers = ShipperService.query();
            $scope.gridOptions = {
                data: 'order.Shippers',
                showSelectionCheckbox: true,
                multiSelect: false,
                afterSelectionChange: function(row) {
                    $scope.order.Shipper = row.entity;
                },
                columnDefs: [
                    { displayName: 'Name', field: 'Name' },
                    { displayName: 'Rate', field: 'ShippingRate.Price', cellFilter: 'currency'}
                ]
            }
        },
        link: function(scope,element,attr) {

        }
    };
    return obj;
});

