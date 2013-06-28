
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

four51.app.controller('AddressViewCtrl', function ($scope, $routeParams, AddressService) {
    $scope.address =  $routeParams.id ?
        $scope.address = AddressService.get({ id: $routeParams.id }) :
        $scope.address = {};
    $scope.return = '/addresses';
});