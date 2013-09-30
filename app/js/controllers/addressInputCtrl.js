four51.app.controller('AddressInputCtrl', function ($scope, $location, User, Address, Resources) {
    $scope.save = function() {
        Address.save(this.address, function() {
           $location.path($scope.return);
        });
    };
    $scope.delete = function() {
        Address.delete(this.address, function() {
            $location.path($scope.return);
        });
    };

    $scope.countries = Resources.countries;
    $scope.states = Resources.states;

    $scope.country = function(item) {
        return $scope.address != null ? $scope.address.Country == item.country : false;
    };
    $scope.hasStates = function() {
        return $scope.address != null ? $scope.address.Country == 'US' || $scope.address.Country == 'CA' || $scope.address.Country == 'NL' : false;
    };

    $scope.isPhoneRequired = function() {
        return ($scope.user.Permissions.contains('BillingAddressPhoneRequired') && $scope.address.IsBilling) ||
            ($scope.user.Permissions.contains('ShipAddressPhoneRequired') && $scope.address.IsShipping);
    }
});
