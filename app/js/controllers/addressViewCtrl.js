four51.app.controller('AddressViewCtrl', ['$scope', '$routeParams', 'Address',
function ($scope, $routeParams, Address) {
   $routeParams.id ?
        Address.get($routeParams.id, function(add) {
            $scope.address = add;
        }) :
        $scope.address = { Country: 'US' };
    $scope.return = '/addresses';
}]);