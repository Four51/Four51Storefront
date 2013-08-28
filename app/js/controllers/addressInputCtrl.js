'use strict';

four51.app.controller('AddressInputCtrl', function ($scope, $location, User, Address, ResourcesService) {
    /* set default value to US if it's a new address and other values
    $scope.address.Country = $scope.address.Country || 'US';
    $scope.address.IsBilling = $scope.address.IsBilling || true;
    $scope.address.IsShipping = $scope.address.IsShipping || true;
*/
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
    $scope.countries = ResourcesService.countries;
    $scope.states = ResourcesService.states;

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
