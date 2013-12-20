four51.app.controller('OrderViewCtrl', function OrderViewCtrl($scope, $location, $routeParams, Order, FavoriteOrder, Address, User) {
	$scope.loadingIndicator = true;

	var shipToMultipleAddresses = function(order) {
		if (!order) return false;
		var multi = false;
		angular.forEach(order.LineItems, function(li, i) {
			multi = multi || i > 0 ? li.ShipAddressID != order.LineItems[i-1].ShipAddressID : false;
		});
		return multi;
	};

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
                if (item.ShipperID) return true;
            });
            return false;
        };
        $scope.hasShipAccountOnAnyLineItem = function() {
            angular.forEach(data.LineItems, function(item) {
                if (item.ShipAccount) return true;
            });
            return false;
        };

		if (shipToMultipleAddresses(data)) {
	        angular.forEach(data.LineItems, function(item) {
	            if (item.ShipAddressID) {
	                Address.get(item.ShipAddressID, function(add) {
	                    item.ShipAddress = add;
	                });
	            }
	        });
		}
		else {
			Address.get(data.ShipAddressID || data.LineItems[0].ShipAddressID, function(add) {
				data.ShipAddress = add;
			});
		}

        Address.get(data.BillAddressID, function(add){
            data.BillAddress = add;
        });
	});

	$scope.saveFavorite = function() {
		$scope.displayLoadingIndicator = true;
        FavoriteOrder.save($scope.order, function() {
	        $scope.displayLoadingIndicator = false;
        });
	};

    $scope.repeatOrder = function() {
        $scope.order.Repeat = true;
        Order.save($scope.order, function(data) {
            $scope.currentOrder = data;
            $scope.user.CurrentOrderID = data.ID;
            User.save($scope.user, function(data){
                $scope.user = data;
                $location.path('/cart');
            });
        });
    };

    $scope.onPrint = function()  {
        window.print();
    };

});

