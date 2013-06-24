'use strict';

four51.app.controller('AddressListCtrl', function ($scope, $location, $451, AddressListService) {
    $scope.addresses = AddressListService.query();
    $scope.deleteSelected = function() {
        AddressListService.delete(this.addresses);
    };
    $scope.newAddress = function() {
        $location.path('address/new');
    };
    $scope.checkAll = function(event) {
        angular.forEach($scope.addresses, function(add) {
            add.Selected = !add.Selected;
        });
    }
});

four51.app.controller('AddressViewCtrl', function ($scope, $location, $451, $routeParams, AddressService, ResourcesService) {
    $scope.address = $routeParams.id === 'new' ? {} :  AddressService.get({ id: $routeParams.id });
    $scope.save = function() {
        AddressService.save(this.address, function() {
            $location.path('/address');
        });
    };
    $scope.delete = function(address) {
        AddressService.delete(this.address);
    };
    $scope.countries = ResourcesService.countries;
    $scope.states = ResourcesService.states;

    $scope.country = function(item) {
        return $scope.address != null ? $scope.address.Country == item.country : false;
    };
    $scope.hasstates = function() {
        return $scope.address != null ? $scope.address.Country == 'US' || $scope.address.Country == 'CA' || $scope.address.Country == 'NL' : false;
    };
});
