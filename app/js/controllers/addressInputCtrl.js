four51.app.controller('AddressInputCtrl', ['$scope', '$rootScope', '$location', 'User', 'Address', 'Resources',
function ($scope, $rootScope, $location, User, Address, Resources) {
    $scope.save = function() {
	    $scope.objectExists = false;
        Address.save(this.address,
	        function(address) {
                $rootScope.$broadcast('event:AddressSaved', address);
                $location.path($scope.return);
            },
	        function(ex) {
	            if (ex.Code.is('ObjectExistsException'))
	                $scope.objectExists = true;
            }
        );
    };
    $scope.delete = function() {
        Address.delete(this.address, function() {
            $location.path($scope.return);
        });
    };

	$scope.cancel = function() {
		$scope.return ? $location.path($scope.return) : $rootScope.$broadcast('event:AddressCancel');
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
}]);