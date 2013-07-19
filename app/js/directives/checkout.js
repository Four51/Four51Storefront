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
        controller: function($scope) {
            $scope.allowShipperInput = function() {
                return $scope.user.ShipMethod.ShipperSelectionType == 'UserDropDown' || $scope.user.ShipMethod.ShipperSelectionType == 'UserOpenField';
            };
        },
        link: function(scope,element,attr) {

        }
    };
    return obj;
});

