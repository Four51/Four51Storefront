
four51.app.controller('AddressListCtrl', function ($scope, $location, $451, AddressList) {
    AddressList.query(function(list) {
        $scope.addresses = list;
    });
    $scope.deleteSelected = function() {
        AddressList.delete($scope.addresses, function() {
	        AddressList.query(function(list) {
		        $scope.addresses = list;
	        });
        });
    };

    $scope.newAddress = function() {
        $location.path('address');
    };
    $scope.checkAll = function(event) {
        angular.forEach($scope.addresses, function(add) {
            add.Selected = event.currentTarget.checked;
        });
    }
});

