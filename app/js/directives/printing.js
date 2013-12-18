four51.app.directive('cartprint', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/cartPrintView.html',
        controller: function($scope){
	        $scope.hasShipperOnAnyLineItem = function() {
		        angular.forEach($scope.currentOrder.LineItems, function(item) {
			        if (item.Shipper) return true;
		        });
		        return false;
	        };
	        $scope.hasShipAccountOnAnyLineItem = function() {
		        angular.forEach($scope.currentOrder.LineItems, function(item) {
			        if (item.ShipAccount) return true;
		        });
		        return false;
	        };
        }
    }
    return obj;
});

four51.app.directive('orderprint', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/orderPrintView.html',
        controller: function($scope){
	        $scope.hasShipperOnAnyLineItem = function() {
		        angular.forEach($scope.order.LineItems, function(item) {
			        if (item.Shipper) return true;
		        });
		        return false;
	        };
	        $scope.hasShipAccountOnAnyLineItem = function() {
		        angular.forEach($scope.order.LineItems, function(item) {
			        if (item.ShipAccount) return true;
		        });
		        return false;
	        };
        }
    }
    return obj;
});
