
four51.app.controller('CartViewCtrl', function ($scope, $location, $451, Order, OrderConfig, User, ProductDisplayService) {
	//$scope.order = OrderService.get($scope.user.CurrentOrderID, function(data){
		//angular.forEach($scope.currentOrder.LineItems, function(item){
		//	ProductDisplayService.setProductViewName(item.Product);
		//});
	//});

    $scope.continueShopping = function() {
        $location.path('catalog');
    };

	$scope.cancelOrder = function() {
        Order.delete($scope.currentOrder, function() {
			Order.delete($scope.currentOrder, function(){
				$scope.currentOrder = null;
				$scope.user.CurrentOrderID = null;
				User.save($scope.user, function(){
					$location.path('catalog');
				});
			});
        });
	};

	$scope.saveChanges = function() {
		if($scope.currentOrder.LineItems.length == $451.filter($scope.currentOrder.LineItems, {Property:'Selected', Value: true}).length){
			$scope.cancelOrder();
		}else{
			Order.save($scope.currentOrder, function(data) {
				$scope.currentOrder = data;
				OrderConfig.costcenter(data, $scope.user);
			});
		}
	};

    $scope.checkOut = function() {
        Order.save($scope.currentOrder, function(data) {
            $scope.currentOrder = data;
            $location.path('checkout');
        });
    };

	$scope.$watch('currentOrder.LineItems', function(newval) {
		var newTotal = 0;
        if (!$scope.currentOrder) return newTotal;
		angular.forEach($scope.currentOrder.LineItems, function(item){
			newTotal += item.LineTotal;
		});
		$scope.currentOrder.Subtotal = newTotal;
	}, true);

    $scope.copyAddressToAll = function() {
        angular.forEach($scope.currentOrder.LineItems, function(n) {
            n.DateNeeded = $scope.currentOrder.LineItems[0].DateNeeded;
        });
    };

    // ng grid implementation
    $scope.gridOptions = {
        data: 'currentOrder.LineItems',
        columnDefs: [
            { displayName: 'Remove', field: 'Selected', cellTemplate: 'partials\\controls\\ngGridCheckBox.html' },
            { displayName: 'ID', cellTemplate: "<a href=\"#/cart/default/{{row.rowIndex}}\">{{row.getProperty('ProductIDText')}}</a>"},
            { displayName: 'Product', field: 'Product.Name'},
            { displayName: 'Specifications', field: 'Specs', cellTemplate: 'partials\\controls\\ngGridList.html'},
            { displayName: 'Unit Price', field: 'UnitPrice', cellFilter: 'currency' },
            { displayName: 'Quantity', cellTemplate: "<div class='ngCellText colt{{$index}}'><quantityfield error='qtyError' lineitem='row.entity' />{{qtyError}}</div>"},
            { displayName: 'Total Quantity', cellTemplate: '<div class="ngCellText colt{{$index}}">{{row.getProperty("Product.QuantityMultiplier") * row.getProperty("Quantity")}}</div>' },
            { displayName: 'Price', field: 'LineTotal', cellFilter: 'currency' }
        ]
    }
});