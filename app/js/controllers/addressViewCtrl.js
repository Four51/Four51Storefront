four51.app.controller('AddressViewCtrl', function ($scope, $routeParams, Address) {
   $routeParams.id ?
        $scope.address = Address.get($routeParams.id, function(add) {
            $scope.address = add;
        }) :
        $scope.address = {};
    $scope.return = '/addresses';
});