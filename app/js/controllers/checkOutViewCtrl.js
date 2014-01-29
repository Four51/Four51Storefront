four51.app.controller('CheckOutViewCtrl', function ($scope, $location, $filter, $rootScope, $451, User, Order, FavoriteOrder, AddressList) {
	if (!$scope.currentOrder) {
        $location.path('catalog');
    }

    AddressList.query(function(list) {
        $scope.addresses = list;
    });

	$scope.shipaddress = { Country: 'US', IsShipping: true, IsBilling: false };
	$scope.billaddress = { Country: 'US', IsShipping: false, IsBilling: true };

    function submitOrder() {
	    $scope.displayLoadingIndicator = true;
        Order.submit($scope.currentOrder,
	        function(data) {
				$scope.user.CurrentOrderID = null;
				User.save($scope.user, function(data) {
			        $scope.user = data;
	                $scope.displayLoadingIndicator = false;
		        });
		        $scope.currentOrder = null;
		        $location.path('/order/' + data.ID);
	        },
	        function(ex) {
		        if (ex.Code.is('ObjectExistsException')) { // unique id
			        ex.Message = ex.Message.replace('{0}', 'Order ID (' + $scope.currentOrder.ExternalID + ')');
		        }
		        $scope.cart_billing.$setValidity('paymentMethod', false);
		        $scope.actionMessage = ex.Message;
		        $scope.displayLoadingIndicator = false;
		        $scope.shippingUpdatingIndicator = false;
		        $scope.shippingFetchIndicator = false;
		        $scope.showSave = false;
	        }
        );
    };

    function saveChanges(callback) {
	    $scope.displayLoadingIndicator = true;
        $scope.showSave = true;
	    var auto = $scope.currentOrder.autoID;
        Order.save($scope.currentOrder,
	        function(data) {
	            $scope.currentOrder = data;
		        if (auto) {
			        $scope.currentOrder.autoID = true;
			        $scope.currentOrder.ExternalID = 'auto';
		        }
		        $scope.displayLoadingIndicator = false;
		        if (callback) callback($scope.currentOrder);
	            $scope.showSave = false;
	        },
	        function(ex) {
		        if (ex.Code.is('ObjectExistsException')) { // unique id
			        ex.Message = ex.Message.replace('{0}', 'Order ID (' + $scope.currentOrder.ExternalID + ')');
		        }
		        $scope.actionMessage = ex.Message;
		        $scope.displayLoadingIndicator = false;
		        $scope.shippingUpdatingIndicator = false;
		        $scope.shippingFetchIndicator = false;
                $scope.showSave = false;
	        }
        );
    };

    $scope.continueShopping = function() {
	    if (confirm('Do you want to save changes to your order before continuing?') == true)
	        saveChanges(function() { $location.path('catalog') });
        else
		    $location.path('catalog');
    };

    $scope.cancelOrder = function() {
	    if (confirm('Are you sure you wish to cancel your order?') == true) {
		    $scope.displayLoadingIndicator = true;
	        Order.delete($scope.currentOrder,
		        function() {
		            $scope.user.CurrentOrderID = null;
		            $scope.currentOrder = null;
			        User.save($scope.user, function(data) {
				        $scope.user = data;
				        $scope.displayLoadingIndicator = false;
				        $location.path('catalog');
			        });
		        },
		        function(ex) {
			        $scope.actionMessage = ex.Message;
			        $scope.displayLoadingIndicator = false;
		        }
	        );
	    }
    };

    $scope.saveChanges = function() {
        saveChanges();
    };

    $scope.submitOrder = function() {
       submitOrder();
    };

    $scope.saveFavorite = function() {
        FavoriteOrder.save($scope.currentOrder);
    };

    $scope.checkOutSection = 'order';
});