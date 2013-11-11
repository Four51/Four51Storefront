four51.app.controller('OrderViewCtrl', function OrderViewCtrl($scope, $location, $routeParams, Order, FavoriteOrder) {
	Order.get($routeParams.id, function(data){
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
        FavoriteOrder.save($scope.order);
	};

    $scope.onPrint = function()  {
        window.print();
    };

});

