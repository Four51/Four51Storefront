'use strict';

four51.app.controller('AddressListCtrl', function ($scope, $location, $451, AddressListService) {
    $scope.addresses = AddressListService.query();
    $scope.deleteSelected = function() {
        $scope.addresses = AddressListService.delete(this.addresses);
    };
    $scope.newAddress = function() {
        $location.path('address');
    };
    $scope.checkAll = function(event) {
        angular.forEach($scope.addresses, function(add) {
            add.Selected = !add.Selected;
        });
    }
});

four51.app.controller('AddressViewCtrl', function ($scope, $location, $451, $routeParams, AddressService, ResourcesService, UserService) {
    $routeParams.id ?
        $scope.address = AddressService.get({ id: $routeParams.id }) :
        $scope.address = {};

    // set default value to US is it's a new address and other values
    $scope.address.Country = $scope.address.Country || 'US';
    $scope.address.IsBilling = $scope.address.IsBilling || true;
    $scope.address.IsShipping = $scope.address.IsShipping || true;

    $scope.save = function() {
        AddressService.save(this.address, function() {
            $location.path('/addresses');
        });
    };
    $scope.delete = function() {
        AddressService.delete(this.address, function() {
            $location.path('/addresses');
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
        return (UserService.permission.contains('BillingAddressPhoneRequired') && $scope.address.IsBilling) ||
            (UserService.permission.contains('ShipAddressPhoneRequired') && $scope.address.IsShipping);
    }
});
