
four51.app.controller('AddressListCtrl', ['$scope', '$location', '$451', 'AddressList',
function ($scope, $location, $451, AddressList) {
	$scope.settings = {
		currentPage: 1,
		pageSize: 10
	};
	function Query() {
		$scope.pagedIndicator = true;
		$scope.addresses = null;
		AddressList.clear();
		AddressList.query(function (list, count) {
			$scope.addresses = list;
			$scope.settings.listCount = count;
			$scope.pagedIndicator = false;
		}, $scope.settings.currentPage, $scope.settings.pageSize, $scope.searchTerm, true);
	}

    $scope.deleteSelected = function() {
	    $scope.displayLoadingIndicator = true;
        AddressList.delete($scope.addresses, function() {
	        $scope.displayLoadingIndicator = false;
	        Query();
        });
    };

	$scope.$watch('settings.currentPage', function(n,o) {
		Query();
	});

    $scope.newAddress = function() {
        $location.path('address');
    };
    $scope.checkAll = function(event) {
        angular.forEach($scope.addresses, function(add) {
            add.Selected = event.currentTarget.checked;
        });
    };

	$scope.search = function(e) {
		e.preventDefault();
		Query();
	};
}]);