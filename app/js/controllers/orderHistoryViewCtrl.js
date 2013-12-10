four51.app.controller('OrderViewCtrl', function OrderViewCtrl($scope, $location, $routeParams, Order, FavoriteOrder) {
	$scope.loadingIndicator = true;
	Order.get($routeParams.id, function(data){
		$scope.loadingIndicator = false;
        $scope.order = data;
        $scope.hasSpecsOnAnyLineItem = false;
		for(var i = 0; i < data.LineItems.length ; i++) {
			if (data.LineItems[i].Specs) {
				$scope.hasSpecsOnAnyLineItem = true;
				break;
			}
		}
        $scope.hasShipperOnAnyLineItem = function() {
            angular.forEach(data.LineItems, function(item) {
                if (item.Shipper) return true;
            });
            return false;
        };
        $scope.hasShipAccountOnAnyLineItem = function() {
            angular.forEach(data.LineItems, function(item) {
                if (item.ShipAccount) return true;
            });
            return false;
        };
	});

	$scope.saveFavorite = function() {
		$scope.displayLoadingIndicator = true;
        FavoriteOrder.save($scope.order, function() {
	        $scope.displayLoadingIndicator = false;
        });
	};

    $scope.onPrint = function()  {
        window.print();
    };

});

