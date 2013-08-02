four51.app.controller('AddressViewCtrl', function ($scope, $routeParams, AddressService) {
    $scope.address =  $routeParams.id ?
        $scope.address = AddressService.get({ id: $routeParams.id }) :
        $scope.address = {};
    $scope.return = '/addresses';
});