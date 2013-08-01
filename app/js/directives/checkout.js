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
            function getShippers() {
                if ($scope.order.ShipAddressID != null)
                    $scope.shippers = ShipperService.query();
            }

            $scope.allowShipperInput = function() {
                return $scope.user.ShipMethod.ShipperSelectionType == 'UserDropDown' || $scope.user.ShipMethod.ShipperSelectionType == 'UserOpenField';
            };
            $scope.$on('event:shipAddressUpdate', function() {
                getShippers();
            });
            getShippers();
        },
        link: function(scope,element,attr) {

        }
    };
    return obj;
});

