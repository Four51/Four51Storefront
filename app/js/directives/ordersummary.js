four51.app.directive('ordersummary', ['Order', 'Coupon', function(Order, Coupon) {
	var obj = {
		restrict: 'AE',
		templateUrl: 'partials/controls/orderSummary.html',
		controller: ['$scope', function($scope) {
			var save = function(callback) {
				Order.save($scope.currentOrder,
					function(data) {
						$scope.currentOrder = data;
						if (callback) callback($scope.currentOrder);
					}
				);
			};

			$scope.applyCoupon = function() {
				$scope.couponLoadingIndicator = true;
				$scope.couponError = null;
				Coupon.apply($scope.currentOrder.CouponCode,
					function(coupon) {
						$scope.currentOrder.Coupon = coupon;
						save(function() {
							$scope.couponLoadingIndicator = false;
						});
					},
					function(ex) {
						$scope.couponError = ex.Message;
						$scope.couponLoadingIndicator = false;
					}
				);
			};

			$scope.removeCoupon = function() {
				$scope.couponError = null;
				$scope.couponRemoveIndicator = true;
				Coupon.remove(function() {
					save(function() {
						$scope.couponRemoveIndicator = false;
					});
				});
			};
		}]
	};
	return obj;
}]);

four51.app.directive('orderconfirmationmessage', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/messages/orderConfirmation.html'
	};
	return obj;
});


four51.app.directive('orderacknowledgemessage', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/messages/orderAcknowledgement.html'
	};
	return obj;
});